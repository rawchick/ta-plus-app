export default {
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#00968880',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        width: '80%',
        padding: 30
    },
    logo: {
        alignSelf: 'center',
        margin: 30
    },
    heading: {
        textAlign: 'center',
        color: '#00a4de',
        fontSize: 21,
    },
    description: (error: any) => ({
        textAlign: 'center',
        color: error ? '#ea3d13' : '#a5a5a5',
        height: 65,
        fontSize: 18
    }),
    buttonContainer: {
        padding: 10,
        marginTop: 20,
        alignItems: 'flex-end'
    },
    buttonText: {
        color: '#009688',
        fontSize: 15,
        fontWeight: 'bold',
    },
};