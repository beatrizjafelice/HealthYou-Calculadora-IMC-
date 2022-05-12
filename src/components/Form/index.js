import React, { useState } from  "react"
import { View, Text, TextInput, TouchableOpacity, Pressable, Keyboard, FlatList } from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";



export default function Form() {

    const[height, setHeight] = useState(null)
    const[weight, setWeight] = useState(null)
    const[messageImc, setMessageImc] = useState("Preencha o peso e a altura")
    const[imc, setImc] = useState(null)
    const[textButton, setTextButton] = useState("Calcular IMC")
    const[errorMessage, setErrorMessage] = useState(null)
    const[imcList, setImcList] = useState([])


    function imcCalculator() {
        let heightFormat = height.replace(",", ".")
        let weightFormat = weight.replace(",", ".")
        let totalImc = ((weightFormat/(heightFormat*heightFormat)).toFixed(2));
        setImcList ((arr) => [...arr, {id: new Date().getTime(), imc:totalImc}])
        setImc(totalImc)
    }

    function verifyNull() {
        if (imc == null) {
            setErrorMessage("Campo obrigatório *")
        } 
    }
    
    function validationImc(){
        console.log(imcList)
        if (weight != null && height != null) {
            imcCalculator()
            setMessageImc("Seu IMC é igual a: ")
            setHeight(null)
            setWeight(null)
            setErrorMessage(null)
            setTextButton("Calcular novamente")
        } else {
            verifyNull()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e a altura")
        }
        
    }

    return(
        <View style={styles.formContext}>
            {imc == null ? 
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                {errorMessage != null &&
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                
                <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="1.75"
                keyboardType="numeric"/>
                    
                <Text style={styles.formLabel}>Peso</Text>
                {errorMessage != null &&
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="50kg"
                keyboardType="numeric"/>

                <TouchableOpacity
                style={styles.buttonCalculator}
                title={textButton}
                onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity> 
            </Pressable>
            : 
            <View style={styles.showResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                <TouchableOpacity
                style={styles.buttonCalculator}
                title={textButton}
                onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
                <View style={styles.listContainer}>
                <FlatList 
                showsVerticalScrollIndicator={false}
                style={styles.listImc}
                data={imcList.reverse()}
                renderItem={({item}) => {
                return(
                    <Text style={styles.resultImcItem}>
                        Resultado IMC:  
                        <Text style={styles.resultImcListItem}>
                            {item.imc}
                        </Text>
                    </Text>
                    )
                }}
                keyExtractor={(item) => item.id }/>
                </View>
            </View>
            }
            

            


            
        </View>
    );
}