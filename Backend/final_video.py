from moviepy.editor import VideoFileClip, AudioFileClip
import os

def combine_video_with_audio(video_path, audio_path, output_path):
    video_clip = VideoFileClip(video_path)
    audio_clip = AudioFileClip(audio_path)


    video_clip = video_clip.set_audio(audio_clip)

    video_clip.write_videofile(output_path, codec="libx264")

# Replace these paths with your file paths
video_file_path = "extracted\\video_without_audio.mp4"
audio_file_path = "Output\\translated_audio.mp3"
output_file_path = os.path.join("Final", "dubbed_video.mp4")

# Call the function to combine the video and audio
combine_video_with_audio(video_file_path, audio_file_path, output_file_path)