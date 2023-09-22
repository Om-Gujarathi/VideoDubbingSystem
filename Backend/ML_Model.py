def mlalgo():
    from transformers import pipeline, MBartForConditionalGeneration, MBart50TokenizerFast
    from datasets import Dataset
    from datasets import Audio
    import soundfile as sf
    import torch
    from aksharamukha import transliterate

    device = "cuda:0" if torch.cuda.is_available() else "cpu"

    pipe = pipeline(
        "automatic-speech-recognition",
        model="openai/whisper-tiny.en",
        chunk_length_s=30,
        device=device,
    )

    ds = Dataset.from_dict({"audio": ["extracted\\audio_only.mp3"]}).cast_column("audio", Audio())
    sample = ds[0]["audio"]

    prediction = pipe(sample.copy(), batch_size=8)["text"]
    print(prediction)

    prediction = pipe(sample.copy(), batch_size=8, return_timestamps=False)

    print(prediction)
    English_text = str(prediction['text'])

    # Language Translation - Text to Text

    model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-one-to-many-mmt")
    tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-one-to-many-mmt", src_lang="en_XX")

    model_inputs = tokenizer(English_text, return_tensors="pt")

    generated_tokens = model.generate(
        **model_inputs,
        forced_bos_token_id=tokenizer.lang_code_to_id["hi_IN"]
    )

    print(tokenizer.batch_decode(generated_tokens, skip_special_tokens=True))

    Hindi_text = str(tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0])

    # Text to Speech -

    model, example_text = torch.hub.load(repo_or_dir='snakers4/silero-models',
                                         model='silero_tts',
                                         language='indic',
                                         speaker='v4_indic')

    print("done1")

    roman_text = transliterate.process('Devanagari', 'ISO', Hindi_text)
    print("done2")
    audio = model.apply_tts(roman_text,
                            speaker='hindi_female')
    print("done3")
    # output_path = 'finalOutput.wav'
    output_path = 'Output\\translated_audio.mp3'
    sf.write(output_path, audio.squeeze().numpy(), 48000)
