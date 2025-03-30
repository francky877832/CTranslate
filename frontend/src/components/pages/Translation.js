import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, translationStylesheet, Alert, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { IconButton } from 'react-native-paper';

import SelectLanguage from './SelectLanguage'; // Assurez-vous d'importer SelectLanguage
import { translationStyles } from '../../styles/translationStyles';
import { TranslationContext } from '../../context/TranslationContext';
import { alert } from '../../utils/globalFunctions';
import { server } from '../../remote/server';

export default function TranslationApp() {
  const { transcriptAudio, transcriptText } = useContext(TranslationContext)
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [textInput, setTextInput] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [uri, setUri] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  // Fonction pour démarrer l'enregistrement
  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }

      // Configuration audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  // Fonction pour arrêter l'enregistrement
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setUri(uri);
    console.log('Recording stopped and stored at', uri);

    //SENDING THE AUDIO TO THE SERVER
     // Convertir en `FormData` pour l'envoyer au serveur
     const formData = new FormData();
     //console.log(uri)
     formData.append('audio', {
       uri,
       name: 'audio.m4a', 
      type: 'audio/m4a'
     });
     
     const res = await transcriptAudio(formData)
     if(res)
     {
        setTextInput(res)
     }
     else
     {
        alert("Error while transcripting the audio.")
     }
  }

  const translateText = async () => {
    const formData = {
        text : textInput, 
        languageCode : 'fr-FR',
        voiceName : 'fr-FR-Wavenet-A'
    }

    const {audio, text } = await transcriptText(formData)
     if(audio && text)
     {
        setUri(server+"/"+audio.split('\\').join('/'))
        console.log(audio)
        //setUri('http://192.168.248.254:3001/assets/audio/output/audio.mp3')
        setUri('https://kouapp.s3.eu-north-1.amazonaws.com/audio.mp3')
     }
     else
     {
        alert("Error while transcripting text to audio.")
     }
  }

  // Fonction pour lire l'enregistrement
  async function playSound() {
    if (uri) {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
        { uri } // Utilisation de l'URI de l'enregistrement
      );
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    }
  }

  // Nettoyer les ressources audio
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Fonction pour valider l'enregistrement
  const validateRecording = () => {
    console.log('Recording validated');
  };

  // Fonction pour échanger les langues de traduction
  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <ScrollView contentContainerStyle={translationStyles.container}>
      <View style={translationStyles.languageSelector}>
        <SelectLanguage language={sourceLanguage} onLanguageChange={setSourceLanguage} />
          <IconButton icon="swap-horizontal" style={translationStyles.swapButton} size={30} onPress={swapLanguages}/>
        <SelectLanguage language={targetLanguage} onLanguageChange={setTargetLanguage} />
      </View>

      <View style={translationStyles.translationContainer}>
        <TextInput
          style={translationStyles.input}
          value={textInput}
          onChangeText={setTextInput}
          placeholder={sourceLanguage === 'en' ? 'Type your text here...' : 'Tapez votre texte ici...'}
          multiline
        />

        <View style={translationStyles.translateButtonContainer}>
            <Button title="Translate" onPress={translateText} />
        </View>

        <View style={translationStyles.recordButtonContainer}>
          {!recording ? (
            <Button title={sourceLanguage === 'en' ? 'Start Recording' : 'Commencer l\'enregistrement'} onPress={startRecording} />
          ) : (
            <Button title={sourceLanguage === 'en' ? 'Stop Recording' : 'Arrêter l\'enregistrement'} onPress={stopRecording} />
          )}
        </View>

        <TextInput
          style={translationStyles.input}
          value={translatedText}
          placeholder={targetLanguage === 'en' ? 'Translation will appear here' : 'La traduction apparaîtra ici'}
          editable={false}
          multiline
        />

        {(uri || sound) && (
          <View style={translationStyles.audioControls}>
            <Button title={sourceLanguage === 'en' ? 'Play Recorded Sound' : 'Lire l\'enregistrement'} onPress={playSound} />
            <Button title={sourceLanguage === 'en' ? 'Validate Recording' : 'Valider l\'enregistrement'} onPress={validateRecording} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

