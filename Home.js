import React, { useState } from 'react';
import { View, Button, Modal, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';

const ErrorMessage = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const Home = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [listas, setListas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const createNewList = () => {
    setShowModal(true);
  };

  const handleCreateList = () => {
    if (newListName.trim() === '') {
      setErrorMessage('Digite um nome para a lista');
    } else {
      const newList = { id: Date.now(), nome: newListName };
      setListas([...listas, newList]);
      setShowModal(false);
      setNewListName('');
      setErrorMessage('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewListName('');
    setErrorMessage('');
  };

  const handleDeleteList = (id) => {
    const updatedListas = listas.filter((item) => item.id !== id);
    setListas(updatedListas);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/marketlist.png')} style={styles.logo} />

      <TouchableOpacity onPress={createNewList} style={styles.button}>
      <Text style={styles.buttonText}>Nova Lista de Compras</Text>
      <Entypo name="new-message" size={24} color="white" style={styles.icon} />
    </TouchableOpacity>
      <View style={styles.textoContainer}>
        <Text style={styles.texto}>Suas Listas</Text>
        <FontAwesome5 name="hand-point-down" size={24} color="#0080ff" style={styles.icon} />
      </View>

      <FlatList
        data={listas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('NewList', { listName: item.nome })}
            style={styles.listItemContainer}
          >
            <Text style={styles.listItemText}>{item.nome}</Text>
            <TouchableOpacity
              onPress={() => handleDeleteList(item.id)}
              style={styles.deleteButton}
            >
              <AntDesign name="delete" size={25} color="#FF4040" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />


      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20, elevation: 5, }}>
            <TextInput
              style={{ marginBottom: 10, padding: 8, borderColor: 'gray', borderWidth: 1, borderRadius: 5, }}
              placeholder="Digite o nome da nova lista"
              value={newListName}
              onChangeText={setNewListName}
            />
            <Button title="Criar" onPress={handleCreateList} />
            {errorMessage !== '' && <ErrorMessage message={errorMessage} />}
          </View>
          <TouchableOpacity style={styles.close} onPress={closeModal}>
            <AntDesign name="closecircleo" size={35} color="red" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0080ff',
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  textoContainer:{
    flexDirection: 'row',
    
  },
  texto:{
    fontSize: 15,
    color: '#0080ff',

  },
  icon: {
    marginLeft: 10,
  },
  listItemContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 370,
    height: 50,
    marginTop: 5,
    borderRadius: 5,
    borderColor: '#0080ff',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent:'space-between', 
    alignItems: 'center',  
    elevation: 5,
    padding: 10,
    marginBottom: 10,
    

  },
  listItemText: {
    color: 'black',
    fontSize: 18,
    
  },
  close:{
   marginTop: 10,
   
  }
};


export default Home;
