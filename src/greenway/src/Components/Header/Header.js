import { Box, Center, IconButton, Text, Flex } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Header = (showSidebarButton = true, onShowSidebar) => {
  return (
    <Flex bg="#ffffff" p={4} color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Box flex="1" />
    </Flex>
  )
}

export default Header
