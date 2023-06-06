import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import { Feather, Ionicons,  MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Axios from "axios";

const ModelList = ({route}) => {
  const navigation = useNavigation();
  const [compras, setCompras] = useState('');
  const [comprasList, setComprasList] = useState([]);
  const [filteredCompras, setFilteredCompras] = useState([]);
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState(0);

  const { listName, id } = route.params;

  useEffect(() => {
    Axios.get("http://172.23.32.1:3001/produto").then(
      (response) => {
        setFilteredCompras(response.data)
      }
    )
  }, [filteredCompras])

  const novoProduto = () => {
    console.log(listName, id)
    Axios.post("http://172.23.32.1:3001/market", {prod: compras, id:id})  
  }

  

  // Função do botão de adicionar um item na lista de compras
  const handleAddCompra = () => {
    if (compras.trim()) {
      setComprasList([...comprasList, { id: Date.now(), text: compras }]);
      setFilteredCompras([...filteredCompras, { id: Date.now(), text: compras }]);
      setCompras('');
    }
  };

  // Função do botão de deletar um item na lista de compras
  const handleDeleteCompra = (id) => {
    setComprasList(comprasList.filter((compra) => compra.id !== id));
    setFilteredCompras(filteredCompras.filter((compra) => compra.id !== id));
  };

  // Função do SearchBar
  const handleFilter = (text) => {
    setFilteredCompras(
      comprasList.filter((compra) =>
        compra.text.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  // Valor máximo e mínimo exibido
  const maxTotal = 999999;
  const minTotal = 0;

  // Função de soma
  const handleCalculation = () => {
    const result = parseFloat(value) * parseFloat(quantity);
    const newTotal = total + result;

    if (newTotal > maxTotal) {
      setTotal(maxTotal);
    } else {
      setTotal(newTotal);
    }

    setValue('');
    setQuantity('');
  };

  // Função de subtração
  const handleSubtraction = () => {
    const result = parseFloat(value) * parseFloat(quantity);
    const newTotal = total - result;
  
    if (newTotal < minTotal) {
      setTotal(minTotal);
    } else {
      setTotal(newTotal);
    }
  
    setValue('');
    setQuantity('');
  };
  
  // Renderiza o item na lista
  const renderItem = ({ item }) => (
    <View style={styles.compraItemContainer}>
      <Text style={styles.compraItem}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteCompra(item.id)}>
        <FontAwesome name="check" size={30} color="#79DF68" />
      </TouchableOpacity>
    </View>
  );
  return (
<SafeAreaView style={styles.container}>

  {/*Logo marca*/}
  <View style={styles.headerlogo}>
    <Image source={require('./assets/marketlist.png')} />
  </View>

  {/*Header com text input e com a soma do produta a lista*/}
  <View style={styles.header}>
    <TextInput
      style={styles.input}
      value={compras}
      onChangeText={setCompras}
      placeholder="Adicione um item na lista de compras"
    />
    <TouchableOpacity style={styles.addButton} onPress={handleAddCompra}>
      <Ionicons name="add-outline" size={30} color="black" style={styles.add} />
    </TouchableOpacity>
  </View>

  {/*Barra de pesquisa*/}
  <View style={styles.searchContainer}>
    <Feather name="search" size={20} color="black" />
    <TextInput
      style={styles.searchInput}
      onChangeText={handleFilter}
      placeholder="Pesquisar                                                                                                                                                                                                                                                                                                             "
    />
  </View>

  {/*Separação entre áreas de inputs e lista*/}
  <View style={styles.line}/>

  {/*Item da lista*/}
  <FlatList
    data={filteredCompras}
    renderItem={renderItem.produto}
    contentContainerStyle={styles.comprasList}
  />

  {/*Separação entre áreas de inputs e lista*/}
  <View style={styles.line}/>

  
  <View style={styles.calculatorContainer}>
    {/*Inputs de valor e quantidade*/}
    <View style={styles.inputsContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        placeholder="Valor"
      />

      <Text>X</Text>

      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Quantidade"
      />
    </View>

    {/*Botões de adição e subtração*/}
    <View style={styles.calculobox}>      
      <TouchableOpacity
        style={styles.calcButton}
        onPress={handleCalculation}
        disabled={!value || !quantity}
      >
        <Text style={styles.calcText}>Somar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.calcButton}
        onPress={handleSubtraction}
        disabled={!value || !quantity}
      >
        <Text style={styles.calcText}>Subtrair</Text>
      </TouchableOpacity>

      {/*Texto de valor total da compra*/}
      
      <Text style={styles.total}>Total da compra: R$ {total.toFixed(2).slice(0, 6)}</Text>
    </View>
  </View>
  
  <View style={styles.cartButton}>
  <TouchableOpacity onPress={() => navigation.navigate('Carrinho')} style={styles.container}>
  <View style={styles.cartContainer}>
      <Text style={styles.cartText}>
        Ver os itens já adicionados ao carrinho
      </Text>
      <MaterialCommunityIcons name="cart-check" size={24} color="white" style={styles.icon} />
      </View>
    </TouchableOpacity>
    

      </View>

</SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginVertical: 10,
    marginTop: 50,
    elevation: 10,
    shadowColor:'black',
    shadowOpacity: 5,
    shadowOffset:{width:1,height:2},    
  },
  headerlogo:{
    alignItems:'center',
    marginBottom:-50,
  
  },
  add:{
    color:'white',
  },
  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 20,
    marginTop:-4,
    marginBottom: 10,
    borderColor: '#ccc',    
  },
  searchInput:{
    marginStart: 5,
    marginRight:100,
  },
  line:{
  height:5,
  backgroundColor: '#0080ff',
  marginHorizontal: 20,
  borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#0080ff',
    borderRadius: 5,
    padding: 8,
    justifyContent: 'center',
    borderRadius: 5,
  },
  comprasList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  compraItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor:'black',
    shadowOpacity: 5,
    shadowOffset:{width:1,height:2},
    borderColor: '#ccc',
  },
  compraItem: {
    fontSize: 16,
    flex: 1,    
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    
    
  },
  calcButton:{
    height: 40,
    width:70,
    backgroundColor: '#0080ff',
    marginRight:10,
    borderRadius: 5, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    flex: 1,
  },
  total: {
    fontSize: 15,
    fontWeight: 'bold', 
  },
  calculobox:{
    flexDirection: 'row',
    marginHorizontal:20,
    marginBottom:10,
    justifyContent: 'space-between',
    alignItems: 'center',  
  },
  cartContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    
  },
  cartButton: {
    height: 40,
    width: '90%',
    backgroundColor: '#0080ff',
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', 
    alignSelf: 'center', 
    
  },
  cartText: {
    fontWeight: 'bold',
    color: 'white',
    marginEnd: 10,
  },
});

export default ModelList;
