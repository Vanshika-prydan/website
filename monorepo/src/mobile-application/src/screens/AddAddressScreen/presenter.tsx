import BookingTitle from '../../components/BookingTitle';
import InputTitle from '../../components/InputTitle';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { RegularText } from '../../components/Text';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PostalCode from '../../utils/postal-codes';
import TextInput from '../../components/TextInput';
import { Color } from '../../styles';
import InputSection from './InputSection';
import InputLabel from '../../components/InputLabel';
import apiService from '../../services/api-service';
import { RootState } from '@store/rootReducer';
import { useSelector } from 'react-redux';
import { generateErrorMessage } from '../../utils/generate-error-message';
import { getCustomerIdFromAccountId } from '../../utils/customer-utils';
import validationSchema from './validation-schema';
import { Address, AddressType, FormValues, Props } from './types';

const initialValues: FormValues = {
  street: '',
  postalCode: '',
  doorCode: '',
  areaInM2: '',
  addressType: 'Hemadress',
  numberOfBathRooms: '',
};

const AddAddressScreenPresenter: React.FunctionComponent<Props> = ({
  onCreated,
}) => {
  const accountId = useSelector(
    (state: RootState) => state.authentication.currentAccount?.accountId
  );
  if (!accountId) return null;

  const onSubmit = async () => {
    const {
      street,
      postalCode,
      areaInM2,
      numberOfBathRooms,
      doorCode,
      addressType,
    } = formik.values;
    try {
      const customerId = await getCustomerIdFromAccountId(accountId);
      await apiService.addCustomerAddress(
        {
          addressName: addressType,
          street,
          postalCode,
          postalCity: new PostalCode().getCityFromCode(postalCode),
          homeAreaInM2: Number.parseInt(areaInM2, 10),
          numberOfBathrooms: Number.parseInt(numberOfBathRooms, 10),
          code: doorCode,
          country: 'SE',
        },
        customerId
      );
      onCreated();
    } catch (e) {
      Alert.alert(generateErrorMessage(e));
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const [isSelectingAddressType, setIsSelectingAddressType] = useState(false);
  return (
    <ScreenContainer>
      <BookingTitle title="Lägg till adress" />

      <InputSection
        title="Gatuadress"
        errorMessage={formik.touched.street ? formik.errors.street : undefined}
        onChangeText={formik.handleChange('street')}
        value={formik.values.street}
        onBlur={formik.handleBlur('street')}
      />
      <InputSection
        title="Postnummer"
        keyboardType="numeric"
        maxLength={5}
        onChangeText={formik.handleChange('postalCode')}
        value={formik.values.postalCode}
        onBlur={formik.handleBlur('postalCode')}
        errorMessage={
          formik.touched.postalCode ? formik.errors.postalCode : undefined
        }
      />

      <InputSection
        title="Eventuell portkod"
        errorMessage={
          formik.touched.doorCode ? formik.errors.doorCode : undefined
        }
        onChangeText={formik.handleChange('doorCode')}
        value={formik.values.doorCode}
        onBlur={formik.handleBlur('doorCode')}
      />

      <View>
        <InputLabel>Antal kvadratmeter</InputLabel>
        <View>
          <TextInput
            keyboardType="numeric"
            maxLength={5}
            onChangeText={formik.handleChange('areaInM2')}
            value={formik.values.areaInM2}
            selectTextOnFocus={true}
            onBlur={formik.handleBlur('areaInM2')}
          />
          <RegularText
            style={{
              position: 'absolute',
              right: 0,
              fontSize: 16,
              paddingVertical: 9,
              paddingHorizontal: 20,
              color: '"rgba(69, 124, 56, 0.3)',
            }}
          >
            m2
          </RegularText>

          {formik.touched.areaInM2 && formik.errors.areaInM2
            ? (
            <RegularText style={{ color: 'red' }}>
              {formik.errors.areaInM2}
            </RegularText>
              )
            : undefined}
        </View>
      </View>

      <InputSection
        title="Antal badrum"
        errorMessage={
          formik.touched.numberOfBathRooms
            ? formik.errors.numberOfBathRooms
            : undefined
        }
        onBlur={formik.handleBlur('numberOfBathRooms')}
        keyboardType="numeric"
        maxLength={2}
        onChangeText={formik.handleChange('numberOfBathRooms')}
        value={formik.values.numberOfBathRooms}
      />

      <View>
        <InputTitle>Vad är det för adress?</InputTitle>
        <TouchableWithoutFeedback
          onPress={() => setIsSelectingAddressType(true)}
        >
          <View style={styles.fakeInput}>
            <RegularText style={{ color: Color.text, fontSize: 16 }}>
              {formik.values.addressType}
            </RegularText>
            <RegularText
              style={{ color: 'rgba(57, 81, 101, 0.6)', fontSize: 16 }}
            >
              Välj
            </RegularText>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSelectingAddressType}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {Address.map((a, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      formik.values.addressType = a as AddressType;
                      setIsSelectingAddressType(false);
                    }}
                  >
                    <RegularText
                      style={[
                        styles.selectType,
                        a === formik.values.addressType
                          ? styles.selectedType
                          : undefined,
                      ]}
                    >
                      {a}
                    </RegularText>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => setIsSelectingAddressType(false)}
                >
                  <RegularText style={{ color: 'red', marginTop: 30 }}>
                    Avbryt
                  </RegularText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{}}>
        <PrimaryButton
          onPress={() => formik.handleSubmit()}
          disabled={!formik.isValid || !formik.dirty}
        >
          Lägg till
        </PrimaryButton>
      </View>
    </ScreenContainer>
  );
};

export default AddAddressScreenPresenter;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  selectType: {
    borderColor: Color.border,
    borderWidth: 1,
    borderRadius: 4,
    color: Color.text,
    padding: 5,
    marginVertical: 10,
    textAlign: 'center',
    width: 250,
  },
  selectedType: {
    backgroundColor: 'rgba(57, 81, 101, 0.1)',
  },

  fakeInput: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.border,
    width: '100%',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: Color.background,
    color: Color.text,
    marginTop: 4,
    marginBottom: 10,
    fontFamily: 'BalooChettan2Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
