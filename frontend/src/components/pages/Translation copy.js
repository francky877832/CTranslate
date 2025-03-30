import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const Translation = () => {
    const [text, setText] = useState("");  // Texte à traduire
    const [translatedText, setTranslatedText] = useState(""); // Texte traduit
    const [isLoading, setIsLoading] = useState(false); // État de chargement

    // Fonction pour appeler l'API Google Translate
    const translateText = async () => {
        setIsLoading(true);
        const apiKey = "AIzaSyAUpnvi3rthj_ECd-sUoxzBd4poVS64G8E";  // Remplace avec ta clé API Google

        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        q: text,
                        target: "fr",  // Traduire en français
                    }),
                }
            );

            const data = await response.json();
            console.log(data)
            if (data?.data?.translations?.length > 0) {
                setTranslatedText(data.data.translations[0].translatedText);
            } else {
                console.log("Erreur dans la traduction");
            }
        } catch (error) {
            console.error("Erreur de traduction :", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Text Translation App</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter text to translate"
                value={text}
                onChangeText={setText}
            />
            
            <Button
                title={isLoading ? "Translating..." : "Translate"}
                onPress={translateText}
                disabled={isLoading}
            />

            {translatedText ? (
                <Text style={styles.result}>Translated Text: {translatedText}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    result: {
        fontSize: 16,
        marginTop: 20,
        fontStyle: "italic",
    },
});

export default Translation;
