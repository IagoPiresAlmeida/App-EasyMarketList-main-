import React, { useState, useEffect} from 'react';
import { View, Button, TextInput, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import Axios from "axios";

const Home = ({ navigation }) => {
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [listas, setListas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const deletarItem = (key) => {
    console.log("botao de deletar foi ativado")
    Axios.delete(`http://172.23.32.1:3001/lista/${key}`,)
  }

  useEffect(() => {
    Axios.get("http://172.23.32.1:3001/itens").then(
      (response) => {
        setListas(response.data)
      }
    )
  }, [listas])

  const CriarLista = () => {
    console.log(newListName)
    Axios.post("http://172.23.32.1:3001/lista", {Nomedalista: newListName})    
  }


  const createNewList = () => {
    setShowCreateList(true);
  };


  return (
    <View style={styles.container}>
      <Image source={require('./assets/marketlist.png')} style={styles.logo} />

      {!showCreateList && (
        <TouchableOpacity onPress={createNewList} style={styles.button}>
          <Text style={styles.buttonText}>Nova Lista de Compras</Text>
          <Entypo name="new-message" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
      )}

      {showCreateList && (
        <View style={styles.createListContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da nova lista"
            value={newListName}
            onChangeText={setNewListName}
          />
          <Button title="Criar" onPress={CriarLista} />
          {errorMessage !== '' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.textoContainer}>
        <Text style={styles.texto}>Suas Listas</Text>
        <FontAwesome5 name="hand-point-down" size={24} color="#0080ff" style={styles.icon} />
      </View>

      <FlatList
        data={listas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          
            onPress={() => navigation.navigate('ModelList', { listName: item.itens, id:item.id })}
            style={styles.listItemContainer}
          >
            <Text style={styles.listItemText}>{item.itens}</Text>
            <TouchableOpacity
              onPress={() => deletarItem(item.id)}
              style={styles.deleteButton}
            >
              <AntDesign name="delete" size={25} color="#FF4040" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {},
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
  textoContainer: {
    flexDirection: 'row',
  },
  texto: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    padding: 10,
    marginBottom: 10,
  },
  listItemText: {
    color: 'black',
    fontSize: 18,
  },
  createListContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  
  errorText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
};

export default Home;