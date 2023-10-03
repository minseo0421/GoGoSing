import sys
import urllib.request

import librosa
import pandas as pd
import os

from pydub import AudioSegment
from sklearn.metrics.pairwise import cosine_similarity
import sklearn
from sqlalchemy import create_engine
import urllib.request
from urllib.parse import quote

def main(request):
    # 파일 이름 생성
    userId = request[2]

    # 파일을 읽어올 경로
    file_path = 'config.txt'

    # 변수 초기화
    db_host = ''
    db_port = 0
    db_user = ''
    db_password = ''
    db_name = ''

    # 파일 읽기
    with open(file_path, 'r') as file:
        for line in file:
            # 줄바꿈 문자 제거 후 '='를 기준으로 변수 이름과 값을 나눔
            parts = line.strip().split('=')
            if len(parts) == 2:
                variable_name = parts[0].strip()
                variable_value = parts[1].strip()

                # 변수 이름에 해당하는 변수에 값을 할당
                if variable_name == 'db_host':
                    db_host = variable_value
                elif variable_name == 'db_port':
                    db_port = int(variable_value)
                elif variable_name == 'db_user':
                    db_user = variable_value
                elif variable_name == 'db_password':
                    db_password = variable_value
                elif variable_name == 'db_name':
                    db_name = variable_value

    # SQLAlchemy 엔진 생성
    engine = create_engine(f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")

    sql_query = "SELECT * FROM music_analyze;"
    df = pd.read_sql(sql_query, engine)
    df = df.dropna()
    # print(df)

    def convert(input_file, input_prop, output_file):
        try:
            audio = AudioSegment.from_file(input_file, format=input_prop)
            audio.export(output_file, format="wav")
            os.remove(input_file)
        except:
            print(f"Error converting {input_file} to {output_file}")

    # 웹 오디오 파일 경로 및 출력 파일 경로 설정
    web_url = request[1]
    file_extension = web_url.split(".")[-1]  # URL에서 파일 확장자 추출
    input_web_file = f"{userId}_temp.{file_extension}"

    # input_web_file = 'temp.webm'
    urllib.request.urlretrieve(web_url, input_web_file)
    output_wav_file = f"{userId}_change_1.wav"

    if ".weba" in input_web_file:
        convert(input_web_file, 'weba', output_wav_file)
    elif ".webm" in input_web_file:
        convert(input_web_file, 'webm', output_wav_file)
    elif ".m4a" in input_web_file:
        convert(input_web_file, 'm4a', output_wav_file)
    elif ".wav" in input_web_file:
        convert(input_web_file, 'wav', output_wav_file)

    # 노래 음원 분석
    y,sr = librosa.load(output_wav_file)

    df.loc[100000,'music_id'] = 100000
    # 양음,음양 바뀌는 구간
    zero_crossings = librosa.zero_crossings(y=y, pad=False)
    df.loc[100000,'zero_crossing_rate_mean'] = zero_crossings.mean()
    df.loc[100000,'zero_crossing_rate_var']= zero_crossings.var()
    # 템포
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    df.loc[100000,'tempo'] = tempo
    # 소리의 "무게 중심"이 어딘지를 알려주는 지표
    spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
    df.loc[100000,'spectral_centroid_mean'] = spectral_centroids.mean()
    df.loc[100000,'spectral_centroid_var'] = spectral_centroids.var()
    # 신호 모양을 측정
    spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]
    df.loc[100000,'rolloff_mean'] = spectral_rolloff.mean()
    df.loc[100000,'rolloff_var'] = spectral_rolloff.var()
    # 크로마 특징은 음악의 흥미롭고 강렬한 표현
    chromagram = librosa.feature.chroma_stft(y=y, sr=sr, hop_length=512)
    df.loc[100000,'chroma_stft_mean'] = chromagram.mean()
    df.loc[100000,'chroma_stft_var'] = chromagram.var()

    # p'차 스펙트럼 대역폭을 계산
    spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y,sr=sr)
    df.loc[100000,'spectral_bandwidth_mean']= spectral_bandwidth.mean()
    df.loc[100000,'spectral_bandwidth_var'] = spectral_bandwidth.var()

    #aadaa
    spectral_contrasts = librosa.feature.spectral_contrast(y=y, sr=sr)
    df.loc[100000,'spectral_contrast_mean'] = spectral_contrasts.mean()
    df.loc[100000,'spectral_contrast_var']= spectral_contrasts.var()

    melspectrogram=librosa.feature.melspectrogram(y=y, sr=sr)
    df.loc[100000,'melspectrogram_mean'] = melspectrogram.mean()
    df.loc[100000,'melspectrogram_var']= melspectrogram.var()
    # 사람의 청각 구조를 반영하여 음성 정보 추출
    mfccs = librosa.feature.mfcc(y=y, sr=sr)
    for i in range(len(mfccs)):
      df.loc[100000, 'mfcc'+str(i)+'_mean'] = mfccs[i].mean()
      df.loc[100000, 'mfcc'+str(i)+'_var'] = mfccs[i].var()
    if os.path.exists(f'{userId}_change_1.wav'):
      os.remove(f'{userId}_change_1.wav')
    labels = df[['music_id']]
    df = df.drop(columns=['music_id'])

    sound_df_scaled = sklearn.preprocessing.scale(df)
    sound_df = pd.DataFrame(sound_df_scaled,columns=df.columns)
    similar = cosine_similarity(sound_df.iloc[:-1], sound_df.iloc[-1:])
    sim_df = pd.DataFrame(similar,index=labels['music_id'][:-1])

    # sim_df = sim_df[sim_df[0] > 0]
    # result=sim_df[0].sort_values(ascending=False).head(100)
    # print(result)
    sim_df = sim_df[sim_df[0] > 0]
    result = sim_df[0].sort_values(ascending=False).head(100)

    result = result.index.tolist()
    print("\n".join(map(str, result)))


if __name__ == "__main__":
    main(sys.argv)