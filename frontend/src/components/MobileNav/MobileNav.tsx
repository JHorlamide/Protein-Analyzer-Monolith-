import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { MenuItem } from "../MenuItem/MenuItem";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>ProteinAnalyzer</DrawerHeader>

        <DrawerBody>
          <MenuItem />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
