import React, { FC, Dispatch, SetStateAction } from "react";
import { Modal, Button, Input, Stack, Text } from "native-base";
import { setInMemory } from "../Helpers/storage";

interface Props {
  navigation: any;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  number: string;
  handleChange: (number: string) => void;
}

const EnterNumberModal: FC<Props> = (props) => {
  const { navigation, visible, setVisible, number, handleChange } = props;
  const onPressOK = async () => {
    setVisible(false);
    setInMemory("visible", false);
  };

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <Modal.Content backgroundColor="#2D3033">
        <Modal.Body>
          <Stack alignItems="center">
            <Text color="#fff" fontSize="lg" mb={4} bold>
              Enter A Number
            </Text>
            <Input
              w="270px"
              size="md"
              keyboardType="numeric"
              placeholder="39"
              mb={8}
              value={number}
              onChangeText={handleChange}
              color="white"
            />
            <Button
              colorScheme="teal"
              w="70px"
              borderRadius="50"
              onPress={onPressOK}
            >
              OK
            </Button>
            <Button
              colorScheme="teal"
              variant="link"
              borderRadius="50"
              onPress={() => navigation.navigate("MainScreen")}
            >
              Cancel
            </Button>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default EnterNumberModal;
