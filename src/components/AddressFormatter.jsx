import PropTypes from "prop-types";

const AddressFormatter = ({ address }) => {
  const formatAddress = (addr) => {
    if (addr && addr.length > 5) {
      const formattedAddress = addr.slice(0, 5) + "..." + addr.slice(addr.length - 5, addr.length)
      return formattedAddress
    }
    return addr
  }

  return (
    <span className="formatted-address font-[600]">
      {formatAddress(address)}
    </span>
  )
}

export default AddressFormatter

AddressFormatter.propTypes = {
  address: PropTypes.string
}