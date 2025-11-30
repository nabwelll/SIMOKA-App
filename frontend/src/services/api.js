export const getWaterData = async () => {
  const res = await fetch("http://localhost:5000/api/dataDummy");
  return res.json();
};
