import React, { createContext, useState, useEffect } from 'react'

import { server } from '../remote/server'

const TranslationContext = createContext()
const TranslationProvider = ({children}) => {

    

      

const transcriptAudio = async (formData) => {
    //console.log("okk")
     try {
        //console.log(formData.get('audio'))

        console.log([...formData]);         const response = await fetch(`${server}/api/datas/transcription/audio`, {  
            method: "POST",
            body: formData,  // Pas besoin de headers, ils sont gérés automatiquement
          });
          
        console.log("data")

         const data = await response.json();

         if (!response.ok)  {
             throw new Error(data?.error || "Erreur lors du chargement des applicaitons");
         }
  
       console.log(data.data)
       return data?.data
     } catch (error) {
        alert(error)
         console.log(error);
         return null
     }
  }


  const transcriptText = async (formData) => {
    try {
      const response = await fetch(`${server}/api/datas/transcription/text`, {
        method: "POST",
        headers: {
         // "Authorization": `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),      
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data?.error || "Error transcripting text");
      }
  
      /*console.log("Text:", data.text);
      console.log("Audio (Base64):", data.audio);
  
      // Ici, on peut créer un URL blob pour jouer l'audio
      const audioBlob = new Blob([new Uint8Array(atob(data.audio).split("").map(c => c.charCodeAt(0)))], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();  // Lire l'audio généré*/
  //console.log(audio)
      //return audio
      //console.log(data)
      return data.data
  
    } catch (error) {
      alert(error);
      console.log(error);
      return null;
    }
  };
  
  
    
  const updateApplicationStatus = async (updatedApp) => {
    try {
  
      const response = await fetch(`${server}/api/datas/applications/update/decision/${updatedApp._id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedApp),
      });
  
  const data = await response.json();
      if (!response.ok) {
        redirectNonAuthenticatedUser(data);
  
        throw new Error(data.error || 'Failed to update application');
      }
      return true
      //setIsActivitiesLoading(true)
    } catch (error) {
      alert(error)
      console.error('Error updating application:', error);
      return false
    }
  };
    

    const filterStateVars = { }
    const filterStateSetters = { }
    const utilsFunctions = { transcriptAudio, transcriptText, }
    return (
        <TranslationContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </TranslationContext.Provider>
    )
}


export { TranslationContext, TranslationProvider }