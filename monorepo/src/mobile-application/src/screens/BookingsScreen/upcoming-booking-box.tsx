import { BookingModel } from '../../models/booking.model';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { format, formatDistanceToNowStrict } from 'date-fns';
import svSE from 'date-fns/locale/sv';
import { jsUcfirst } from '../../utils/jsUcfirst';
import BookingBox from './booking-box';
import { Color } from '../../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SmallButton from '../../components/SmallButton';
import PrimaryButton from '../../components/PrimaryButton';
import { RootState } from '../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import AddonBox from './addon-box';
import { TextInput } from 'react-native-gesture-handler';
import { generateErrorMessage } from '../../utils/generate-error-message';
import apiService from '../../services/api-service';
import { updateBooking } from '../../store/booking';
import { MediumText, RegularText } from '../../components/Text';

export interface UpcomingBookingBoxProps {
  booking: BookingModel;
  isFocused?: boolean;
  onExpand(): void;
  onCancel(bookingId: string): void;
}

const ICON_SIZE = 20;

const UpcomingBookingBox: React.FunctionComponent<UpcomingBookingBoxProps> = ({
  booking,
  isFocused,
  onExpand,
  onCancel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const startTime = new Date(booking.startTime);
  const endTime = new Date(booking.endTime);
  const distance = formatDistanceToNowStrict(startTime, { locale: svSE });
  const date = format(startTime, 'eeee d MMMM', { locale: svSE });
  const startTimeString = format(startTime, 'HH:mm', { locale: svSE });
  const endTimeString = format(endTime, 'HH:mm', { locale: svSE });
  const dispatch = useDispatch();
  const [activeAddons, setActiveAddons] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setIsEditing(false);
    }
  });
  useEffect(() => {
    setActiveAddons(booking.addons?.map((a) => a.addon.addonId) ?? []);
    setSpecialInstructions(booking.specialInstructions ?? '');
  }, []);

  const addons = useSelector((state: RootState) => state.addon.addons);

  const promptCancel = () =>
    Alert.alert(
      'Bekräfta avbokning',
      'Genom att trycka bekräfta så avbokar du din tid enligt våra användarvillkor.',
      [
        {
          text: 'Bekräfta',
          onPress: () => onCancel(booking.bookingId),
        },
        {
          text: 'Avbryt',
          onPress: () => {},
          style: 'cancel',
        },
      ]
    );

  const onPressAddon = (addonId: string) => {
    if (activeAddons.includes(addonId)) {
      setActiveAddons(activeAddons.filter((a) => a !== addonId));
    } else setActiveAddons([...activeAddons, addonId]);
  };

  const onSave = async () => {
    try {
      setIsSaving(true);
      const updatedBooking = await apiService.updateBooking(booking.bookingId, {
        addonIds: activeAddons,
        specialInstructions,
      });
      dispatch(updateBooking(updatedBooking));
    } catch (e) {
      setIsSaving(false);
      Alert.alert('Kunde inte spara', generateErrorMessage(e));
    }
  };

  return (
    <BookingBox
      dateText={`Om ${distance}`}
      titleText={`${booking.bookingType.name}`}
      isfocused={isFocused}
      onExpand={onExpand}
    >
      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="calendar"
          size={ICON_SIZE}
          color={Color.text}
        />
        <RegularText style={styles.infoText}>{jsUcfirst(date)}</RegularText>
      </View>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="clock-time-nine"
          size={ICON_SIZE}
          color={Color.text}
        />
        <RegularText
          style={styles.infoText}
        >{`${startTimeString} - ${endTimeString}`}</RegularText>
      </View>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="home-variant"
          size={ICON_SIZE}
          color={Color.text}
        />
        <View>
          <RegularText style={styles.infoText}>
            {booking.address.street}
          </RegularText>
          <RegularText style={styles.infoText}>
            {booking.address.postalCode} {booking.address.postalCity}
          </RegularText>
        </View>
      </View>

      {isEditing
        ? (
        <View>
          <MediumText style={styles.editHeader}>Tillägg</MediumText>
          <View style={styles.addonsContainer}>
            {addons.map((a) => (
              <AddonBox
                onPress={onPressAddon}
                isActive={activeAddons.includes(a.addonId)}
                addon={a}
                key={a.addonId}
              />
            ))}
          </View>

          <MediumText style={styles.editHeader}>Kommentar</MediumText>
          <TextInput
            style={styles.notes}
            value={specialInstructions}
            multiline={true}
            onChangeText={setSpecialInstructions}
          />

          <View>
            <PrimaryButton onPress={onSave} disabled={isSaving}>
              Uppdatera
            </PrimaryButton>
          </View>
        </View>
          )
        : (
        <View
          style={{
            borderTopColor: 'rgba(57, 81, 101, 0.1)',
            borderTopWidth: 1,
            paddingTop: 10,
            marginTop: 10,
          }}
        >
          <View style={styles.addonsList}>
            {booking.addons?.map((a, i) => (
              <View key={i} style={styles.addonRow}>
                <MediumText style={styles.addonText}>+</MediumText>
                <MediumText style={styles.addonText}>{a.addon.name}</MediumText>
              </View>
            ))}
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <SmallButton onPress={() => setIsEditing(true)} title="Ändra" />
            <View style={{ paddingLeft: 20 }} />
            <SmallButton
              onPress={promptCancel}
              title="Avboka"
              invertColor={true}
            />
          </View>
          <ActivityIndicator animating={isSaving} />
        </View>
          )}
    </BookingBox>
  );
};

export default UpcomingBookingBox;

const styles = StyleSheet.create({
  infoText: {
    paddingLeft: 15,
    color: Color.text,
    fontSize: 15,
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'flex-start',
  },

  addonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  editHeader: {
    fontSize: 16,
    color: Color.text,
    marginTop: 20,
    marginBottom: 10,
  },
  notes: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Color.background,
    borderColor: 'rgba(68, 124, 56, 0.29)',
    borderRadius: 4,
    color: 'rgba(58, 82, 103, 0.6)',
    fontSize: 13,
    height: 110,
  },
  addonsList: {},
  addonRow: { flexDirection: 'row', paddingVertical: 3 },
  addonText: {
    color: Color.text,
    fontSize: 15,
    paddingRight: 20,
    fontWeight: '500',
  },
});
