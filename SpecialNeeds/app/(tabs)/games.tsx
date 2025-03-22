import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {analyzeData} from '@/services/api';

const GameScreen = () => {
    const [results, setResults] = useState<string | null>(null);

    const handleGameComplete = async () => {
        const gameData = {}
        const analysis = await analyzeData(gameData);
        setResults(analysis.results);
    };

    return (
        <View style={styles.container}>
            <Text>play the Game</Text>
            <Button title="Complete Game" onPress={handleGameComplete} />
            {results && <Text>{results}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
});

export default GameScreen;
