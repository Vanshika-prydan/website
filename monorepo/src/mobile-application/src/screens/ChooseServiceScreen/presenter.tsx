import React, { Fragment } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { Color } from '../../styles';
import PrimaryButton from '../../components/PrimaryButton';
import ServicePoint from './service-point';
import ListElement from './list-element';
import ExpansionBox from './expansion-box';
import { BoldText, MediumText, RegularText } from '../../components/Text';

interface ChooseServicePresenterProps {
  onPressNext(): void;
}

const ChooseServicePresenter: React.FunctionComponent<ChooseServicePresenterProps> =
  ({ onPressNext }) => {
    return (
      <Fragment>
        <SafeAreaView style={styles.screen}>
          <ScrollView contentContainerStyle={styles.footerPadding}>
            <View style={styles.headerContainer}>
              <BoldText style={styles.headetText}>
                Vad kan vi hjälpa dig med?
              </BoldText>
            </View>
            <View style={styles.container}>
              <View style={styles.cardContainer}>
                <Image
                  source={require('../../../assets/home-cleaning-start.jpg')}
                  style={styles.image}
                />
                <View style={styles.imageTextContaniner}>
                  <MediumText style={styles.imageText}>
                    Ekologisk hemstädning
                  </MediumText>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <ServicePoint title="Ekologisk hemstädning">
                  <RegularText style={styles.text}>
                    Med vår ekologiska hemstädning får du ett hem fritt från
                    onödiga kemikalier. Vi använder enbart de bästa, grönaste
                    hjälpmedlen och våra engagerade medarbetare ser till att
                    göra det där lilla extra för att visa vår omtanke om ditt
                    hem.
                  </RegularText>
                  <BoldText style={styles.detailsHeader}>
                    Här följer en mer detaljerad genomgång av vad som ingår när
                    We Clean Green tar hand om ditt hem
                  </BoldText>
                </ServicePoint>

                <ExpansionBox title="Bostadsrum">
                  <ListElement>Damning av vågräta ytor</ListElement>
                  <ListElement>
                    Dammsugning av mattor, golv och golvlister
                  </ListElement>
                  <ListElement>
                    Avtorkning av luckor, kontakter, lampknappar, foder, lister,
                    dörrar och dörrhandtag
                  </ListElement>
                  <ListElement>Putsning av speglar</ListElement>
                  <ListElement>
                    Tömning av papperskorgar (brännbart eller komposterbart? Vi
                    ser till att det hamnar rätt i sorteringen)
                  </ListElement>
                  <ListElement>Dammning av tavelramar och lampor</ListElement>
                  <ListElement>Dammsuger och våttorkar golv.</ListElement>
                  <ListElement>
                    Bäddar om sängar om nya lakan ligger framme.
                  </ListElement>
                  <ListElement>
                    Dammtorkar ledstång, räcke och spjälor om det finns en
                    trappa.
                  </ListElement>
                  <ListElement>
                    Små mattor tas ut, skakas och torkas av
                  </ListElement>
                </ExpansionBox>

                <ExpansionBox title="Kök och matplats">
                  <ListElement>
                    Samma tjänster som för bostadsrum. Dessutom:
                  </ListElement>
                  <ListElement>
                    Rengörning av kakel/stänkskydd över diskbänk
                  </ListElement>
                  <ListElement>Rengörning av spisen utvändigt </ListElement>
                  <ListElement>
                    Rengörning av micro in- och utvändigt
                  </ListElement>
                  <ListElement>Avtorkning av hushållsmaskiner</ListElement>
                  <ListElement>Avtorkning av kyl/frys utvändigt</ListElement>
                  <ListElement>Rengörning av sopkärl</ListElement>
                  <ListElement>
                    Avtorkning av matsalsbord och stolar
                  </ListElement>
                  <ListElement>
                    Rengörning av diskho, diskbänk och blandare{' '}
                  </ListElement>
                  <ListElement>Avtorkning och dammning ovanpå skåp</ListElement>
                </ExpansionBox>

                <ExpansionBox title="Badrum och toaletter">
                  <ListElement>
                    Samma tjänster som för bostadsrum. Dessutom:
                  </ListElement>
                  <ListElement>
                    Rengörning av badkar och duschutrymme
                  </ListElement>
                  <ListElement>Avtorkning av badrumsmöbler</ListElement>
                  <ListElement>
                    Avtorkning av hängare och handdukstork
                  </ListElement>
                  <ListElement>Rengörning av handfat utsida/insida</ListElement>
                </ExpansionBox>
                <ExpansionBox title="Dessutom i badrum/tvättstuga">
                  <ListElement>
                    Rengör utsidan av vitvaror samt tvättmedelsbehållaren.
                  </ListElement>
                  <ListElement>Rengör filtret i torktumlaren.</ListElement>
                </ExpansionBox>
                <ServicePoint title="Du kan också lägga till (till en extra kostnad)">
                  <ListElement>Strykning och vikning av tvätt</ListElement>
                  <ListElement>Rengöring av insidan av kylskåpet</ListElement>
                  <ListElement>Handdisk/tork</ListElement>
                  <ListElement>Dammsuga madrasser</ListElement>
                  <ListElement>Bädda om alla sängar</ListElement>
                  <ListElement>Fönsterputs</ListElement>
                </ServicePoint>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View style={styles.buttonContainer}>
          <ImageBackground
            style={styles.buttonBackground}
            source={require('../../../assets/Hemstäd_boka_bakom_gradient.png')}
          >
            <View style={styles.padding}>
              <PrimaryButton onPress={onPressNext}>Boka</PrimaryButton>
            </View>
          </ImageBackground>
        </View>
      </Fragment>
    );
  };

export default ChooseServicePresenter;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  footerPadding: {
    paddingBottom: 60,
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  container: {
    flex: 1,
  },
  image: { height: 280, width: '100%' },
  imageTextContaniner: {
    position: 'absolute',
    top: 210,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 9,
  },
  imageText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    color: '#3A5267',
    fontWeight: '500',
  },
  buttonContainer: {
    bottom: 0,
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
  },
  cardContainer: {
    alignItems: 'center',
  },
  titleText: {
    color: Color.text,
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: 'rgba(57, 81, 101, 0.8)',
    paddingRight: 40,
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 25,
  },
  headetText: {
    textAlign: 'center',
    fontSize: 22,
    color: Color.primary,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  buttonBackground: {
    width: '100%',
    height: 170,
    flex: 1,
    justifyContent: 'center',
  },
  detailsHeader: {
    color: Color.text,
    fontSize: 14,
    paddingTop: 20,
    paddingRight: 40,
  },
});
