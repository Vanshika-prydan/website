import React from 'react';
import { View } from 'react-native';
import BookingTitle from '@components/BookingTitle';
import PrimaryButton from '@components/PrimaryButton';
import { AddonModel } from '@models/addon.model';
import ScreenContainer from '@components/ScreenContainer';
import SelectAddons from '@components/SelectAddons';
interface Props {
  onSelectAddon(addonId: string): void;
  addons: AddonModel[];
  selectedAddonIds: string[];
  goNext(): void;
}
const AddonsPresenter: React.FunctionComponent<Props> = ({
  onSelectAddon,
  selectedAddonIds,
  addons,
  goNext,
}) => {
  return (
    <ScreenContainer title="Hemstäd">
      <View style={{ flexGrow: 1 }}>
        <BookingTitle title="Extra tillägg" />

        <SelectAddons
          addons={addons}
          selectedAddonIds={selectedAddonIds}
          onSelectAddon={onSelectAddon}
        />
      </View>
      <View style={{ flex: 1 }}>
        <PrimaryButton onPress={goNext}>Fortsätt</PrimaryButton>
      </View>
    </ScreenContainer>
  );
};

export default AddonsPresenter;
