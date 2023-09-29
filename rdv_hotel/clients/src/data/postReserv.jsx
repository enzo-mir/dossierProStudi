const postReserv = (form) => {
  let postRes = fetch("/reserv", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
    body: JSON.stringify(form),
  });
  return postRes;
};

export default postReserv;
