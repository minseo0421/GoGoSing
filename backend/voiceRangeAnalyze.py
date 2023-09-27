import sys

import librosa
import numpy as np
from pydub import AudioSegment
import urllib.request
import os

def main(image_path):
    def convert(input_file, input_prop, output_file):
        try:
            audio = AudioSegment.from_file(input_file, format=input_prop)
            audio.export(output_file, format="wav")
            os.remove(input_file)
        except:
            print(f"Error converting {input_file} to {output_file}")

    # 웹 오디오 파일 경로 및 출력 파일 경로 설정
    # input_weba_file = "input.weba"  # 원본 "weba" 파일 경로
    # output_wav_file = "output.wav"  # WAV로 변환된 파일 저장 경로

    # 웹 오디오 파일 경로 설정
    web_url = image_path[1]
    file_extension = web_url.split(".")[-1]  # URL에서 파일 확장자 추출
    input_web_file = f"temp.{file_extension}"

    # input_web_file = 'temp.webm'
    urllib.request.urlretrieve(web_url, input_web_file)
    output_wav_file = "change_1.wav"

    if ".weba" in input_web_file:
        convert(input_web_file, 'weba', output_wav_file)
    elif ".webm" in input_web_file:
        convert(input_web_file, 'webm', output_wav_file)
    elif ".m4a" in input_web_file:
        convert(input_web_file, 'm4a', output_wav_file)

    y, sr = librosa.load(output_wav_file)

    # PYIN 알고리즘을 사용하여 피치 추정
    f0, voiced_flag, voiced_probs = librosa.pyin(y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'))

    # 유효한 피치 값만 필터링
    f0 = f0[voiced_flag > 0]

    # 최저 및 최고 피치 추출
    min_pitch = np.min(f0)
    max_pitch = np.max(f0)
    average_pitch = f0.mean()


    # 피치 값을 옥타브로 변환하는 함수
    def hz_to_octave(frequency):
        # A4 음 (440 Hz)을 기준으로 옥타브를 계산
        A4_hz = 440.0
        octave_number = np.log2(frequency / A4_hz)
        return octave_number


    def freq_to_note(frequency):
        # 주파수를 MIDI 노트 번호로 변환하는 공식 (근사값)
        midi_note = 69 + 12 * np.log2(frequency / 440)

        # MIDI 노트 번호를 음이름으로 변환하는 함수 (예시)
        def midi_to_note_name(midi_note):
            note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
            octave = midi_note // 12 - 1
            note_idx = int(midi_note % 12)
            return f'{note_names[note_idx]}{octave}'

        return midi_to_note_name(midi_note)


    def hz_to_midi(frequency):
        # MIDI 노트로 변환하는 공식
        # MIDI 노트 번호는 반올림하여 정수로 반환
        midi_notes = 12 * (np.log2(frequency / 440.0)) + 69
        return np.round(midi_notes).astype(int)


    # 피치 값을 옥타브로 변환하여 출력
    octave_values = hz_to_octave(f0)
    midi_notes = hz_to_midi(f0)
    min_pitch_name = freq_to_note(min_pitch)
    max_pitch_name = freq_to_note(max_pitch)
    # average_pitch_note = freq_to_note(average_pitch)

#     print(f'Min Pitch: {min_pitch} Hz ({min_pitch_name})')
#     print(f'Max Pitch: {max_pitch} Hz ({max_pitch_name})')
    print(min_pitch)
    print(min_pitch_name)
    print(max_pitch)
    print(max_pitch_name)

    os.remove(output_wav_file)
    # print(f'Average Pitch: {average_pitch} Hz ({average_pitch_note})')


if __name__ == "__main__":
    main(sys.argv)