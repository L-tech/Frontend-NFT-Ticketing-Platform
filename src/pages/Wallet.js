import {
  Box,
  CircularProgress,
  Flex,
  Image,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import {
  useEffect,
  useState,
} from "react";
import axios from "axios";

function Wallet({ address }) {
  const [
    loadingTicket,
    setLoadingTicket,
  ] = useState(false);
  const [ticket, setTicket] =
    useState(null);

  const createTicketDisplay = () => {
    const ticket = {
      token_id: 1,
      permalink:
        "https://rinkeby.rarible.com/token/0xaf0b4cbecacd729c2f4536e55d8e401ed3bd3c36:1?tab=history",
      image_url:
        "https://rarible.mypinata.cloud/ipfs/QmUuXqMvJckFhfoEaLFMEfum6roqgrjQedoRuitizw3kwQ",
    };
    return (
      <Link
        href={ticket.permalink}
        key={ticket.token_id}
        isExternal
        width="100%"
        margin="16px 8px"
      >
        <Text
          fontSize="xl"
          textAlign="center"
          mb={2}
        >
          ENFT #{ticket.token_id}
        </Text>
        <Box
          padding="12px"
          border="1px solid black"
          borderRadius="12px"
        >
          <Image
            src={ticket.image_url}
            alt={`NFTix #${ticket.token_id}`}
          />
        </Box>
      </Link>
    );
  };

  useEffect(() => {
    if (!address) return;
    axios
      .get(
        `https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${process.env.REACT_APP_CONTRACT_ID}`
      )
      .then((res) => {
        setLoadingTicket(true);
        console.log(res);
        if (
          res.status === 200 &&
          res?.data?.assets &&
          res?.data?.assets.length
        ) {
          setTicket(res.data.assets[0]);
        }
        setLoadingTicket(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingTicket(false);
      });
  }, [address]);
  return (
    <>
      <Heading mb={2}>
        Your ticket
      </Heading>
      <Flex
        justifyContent="center"
        margin="0 auto 16px"
        width="66%"
      >
        {loadingTicket && (
          <CircularProgress
            capIsRound
            isIndeterminate
            color="green.300"
            size="120px"
          />
        )}
        {!loadingTicket && ticket &&
          createTicketDisplay()}
        {!loadingTicket && !ticket && (
          <Text
            fontSize="xl"
            mb={2}
            width="100%"
          >
            You don't own any tickets 😢
          </Text>
        )}
      </Flex>
    </>
  );
}

export default Wallet;
