# from moviepy.editor import VideoFileClip
import sys
import urllib.request

from pytube import YouTube
import os
from pydub import AudioSegment
import io
import boto3

def main(request):

    # 파일을 읽어올 경로
    file_path = 'config2.txt'

    # AWS 계정 정보 및 S3 버킷 이름 설정
    aws_access_key_id = ''
    aws_secret_access_key = ''
    bucket_name = ''

    # 파일 읽기
    with open(file_path, 'r') as file:
        for line in file:
            # 줄바꿈 문자 제거 후 '='를 기준으로 변수 이름과 값을 나눔
            parts = line.strip().split('=')
            if len(parts) == 2:
                variable_name = parts[0].strip()
                variable_value = parts[1].strip()

                # 변수 이름에 해당하는 변수에 값을 할당
                if variable_name == 'aws_access_key_id':
                    aws_access_key_id = variable_value
                elif variable_name == 'aws_secret_access_key':
                    aws_secret_access_key = variable_value
                elif variable_name == 'bucket_name':
                    bucket_name = variable_value

    voiceFile = request[1]

    # 파일 이름 생성
    userId = request[3]

    save_name = f'{userId}_temp.wav'
    urllib.request.urlretrieve(voiceFile, save_name)

    # url = 'youtube.com/watch?v=' + data.loc[x].music_url
    # 유튜브 링크
    youtubeUrl = request[2]

    yt = YouTube(youtubeUrl)
    video_stream = yt.streams.filter(only_audio=True).first()

    output_filename = "songmr.mp4"
    video_stream.download(output_path=".", filename=output_filename)
    while not os.path.exists(output_filename):
        pass  # 파일이 완전히 다운로드될 때까지 대기합니다.
    # print('다운로드 완료')

    # 다운로드한 동영상에서 오디오 추출
    audio = AudioSegment.from_file(output_filename)
    audio.export(f'{userId}_songmr.wav', format="wav")

    # 다운로드한 동영상 파일 삭제
    os.remove(output_filename)

    # WebM or webA 파일을 읽어오기
    webm_data = open(f'{userId}_temp.wav', 'rb').read()

    # BytesIO로 변환
    audio_data = io.BytesIO(webm_data)

    # WebM 오디오를 AudioSegment 객체로 변환
    audio_segment = AudioSegment.from_file(audio_data, format='webm')

    # WAV 파일로 저장
    audio_segment.export(f'{userId}_recordoutput.wav', format='wav')

    recorded_audio_path = f'{userId}_recordoutput.wav'
    youtube_audio_path = f'{userId}_songmr.wav'

    recorded_audio = AudioSegment.from_file(recorded_audio_path, format='wav')
    youtube_audio = AudioSegment.from_file(youtube_audio_path, format='wav')

    # 오디오 길이를 동기화하기 위해 녹음한 오디오를 잘라냅니다.
    min_duration = min(recorded_audio.duration_seconds, youtube_audio.duration_seconds)
    recorded_audio = recorded_audio[:min_duration * 1000]
    merged_audio = recorded_audio.overlay(youtube_audio[:min_duration * 1000])
    # 오디오 합병
    # merged_audio = youtube_audio.set_audio(recorded_audio)

    # 파일 이름 생성
    file_name = f'{userId}_voiceTempfile.wav'

    # 합병된 오디오 파일 저장 (WAV 형식)
    merged_audio_path = os.path.join(".", file_name)
    # merged_audio.write_audiofile(merged_audio_path, codec='pcm_s16le')
    merged_audio.export(merged_audio_path, format="wav")

    os.remove(recorded_audio_path)
    os.remove(youtube_audio_path)
    os.remove(f'{userId}_temp.wav')

    # print('merged_audio_path')

    # S3 클라이언트 생성
    s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

    # 업로드할 로컬 파일 경로와 S3에 저장될 파일 이름 설정
    local_file_path = file_name
    s3_key = file_name

    # 파일을 S3에 업로드
    s3.upload_file(local_file_path, bucket_name, s3_key)

    # 업로드된 파일의 S3 경로 생성
    s3_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"
    print(s3_url)
    os.remove(local_file_path)

if __name__ == "__main__":
    main(sys.argv)