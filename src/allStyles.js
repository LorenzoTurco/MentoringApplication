import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    loadingScreen: {
        flex: 1,
        backgroundColor: '#1daded',
    },

    loadingText: {
        alignContent: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
    },

    titleText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        color: '#333',
    },

    background: {
        backgroundColor: 'pink',
        padding: 20,
    },
      
    boldText: {
        fontWeight: 'bold',
    },
    
    body: {
        backgroundColor: 'pink',
    },

    headerTitle: {
        padding: 20,
        fontWeight: "bold",
        color: 'black',
        fontSize: 20,
        textTransform: 'uppercase',
    },

    boxContainer: {
        width: '100%',
        height: '70%',
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    box: {
        width: '30%',
        height: '30%',
        padding: 5
    },

    inner: {
        flex: 1,
        backgroundColor: '#1daded',
        alignItems: 'center',
        justifyContent: 'center'
    },

    boxTitle: {
        color: 'white',
        fontSize: 12,
    },

    animatedBox: {
        flex: 1,
        backgroundColor: "white",
        padding: 10
    },
    
    swipesGestureContainer:{
        height:'100%',
        width:'100%'
    },
    
    selectedTag:{
        color: '#800080'
    },

    unselectedTag:{
        color: 'black'
    }
})