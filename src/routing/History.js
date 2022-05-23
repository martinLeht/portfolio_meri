const History = {
    navigate: null,
    push: (page, ...rest) => History.navigate(page, ...rest),
    location: () => History.location()
};
  
export default History;