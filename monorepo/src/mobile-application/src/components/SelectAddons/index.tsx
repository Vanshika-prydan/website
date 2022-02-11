import AddonSelect from '../../components/AddonSelect';
import { RegularText } from '../../components/Text';
import { AddonModel } from '../../models/addon.model';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../../styles';
interface Props {
  addons: AddonModel[];
  selectedAddonIds: string[];
  onSelectAddon(addonId: string): void;
}
const SelectAddons: React.FunctionComponent<Props> = ({
  addons,
  selectedAddonIds,
  onSelectAddon,
}) => {
  return (
    <View>
      <RegularText style={styles.subText}>
        Behöver du extra hjälp med något?
      </RegularText>

      <View style={styles.addonBox}>
        {addons.map((addon) => (
          <View key={addon.addonId} style={{ marginVertical: 7 }}>
            <AddonSelect
              title={addon.name}
              defaultTimeInMinutes={addon.defaultTimeInMinutes}
              selected={selectedAddonIds.includes(addon.addonId)}
              onPress={() => onSelectAddon(addon.addonId)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SelectAddons;

const styles = StyleSheet.create({
  subText: {
    color: Color.text,
    opacity: 0.5,
    fontSize: 14,
    paddingBottom: 15,
  },

  addonBox: {
    marginBottom: 10,
  },
});
