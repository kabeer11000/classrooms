import * as React from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../../styles/styles';

const AddClassButton = ({navigateToScreen}) => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open: val}) => setState({open: val});

  const {open} = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          fabStyle={{backgroundColor: globalColors.Warning}}
          icon={() =>
            open ? (
              <MaterialIcons name="close" size={25} color={globalColors.Dark} />
            ) : (
              <MaterialIcons name="add" size={25} color={globalColors.Dark} />
            )
          }
          actions={[
            {
              icon: () => (
                <MaterialIcons
                  name="class"
                  size={20}
                  color={globalColors.Dark}
                  style={{marginLeft: 2, marginTop: 2}}
                />
              ),
              label: 'Create Class',
              onPress: () => navigateToScreen('Create Class'),
            },
            {
              icon: () => (
                <MaterialIcons
                  name="subdirectory-arrow-right"
                  size={20}
                  color={globalColors.Dark}
                  style={{marginLeft: 4, marginTop: 2}}
                />
              ),
              label: 'Join Class',
              onPress: () => navigateToScreen('Join Class'),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default AddClassButton;
