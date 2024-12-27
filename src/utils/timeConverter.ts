export const timeConverter = (nft: any) => {
  const auction_end = Number(nft?.auction_end) * 1000;
  const currentDate = Date.now();
  const timeLeft = auction_end - currentDate;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  

  const editedTimeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  return { seconds, editedTimeLeft };
}