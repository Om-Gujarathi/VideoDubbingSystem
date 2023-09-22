from flask import Flask, jsonify
from flask_pymongo import PyMongo
from extract_audio import extract_video_and_audio
import threading

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/video_database'
mongo = PyMongo(app)


# FrontEnd to Cloudinary
@app.route("/upload", methods=["POST"])
def upload_video():
    try:
        folder_name = "Raw Files/Video"
        public_id = f"{folder_name}/vid"

        # extract_video_and_audio("vid1.mp4")
        # Start a new thread to execute the extract_video_and_audio function
        thread = threading.Thread(target=extract_video_and_audio, args=("vid1.mp4",))
        thread.start()

        return jsonify({"message": "Video received successfully. Processing has started"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
