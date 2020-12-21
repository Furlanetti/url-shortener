const connection = require("../database/connection");

const create = async (url) => {
  const url_id = await connection("urls").insert(url);
  return url_id[0];
};

const addCodeToUrl = async (id, fields) => {
  return await connection("urls").update(fields).where("id", "=", id);
};

const getUrlById = async (id) => {
  return await connection("urls").where({ id: id }).select("url").first();
};

const addOneToCounter = async (id) => {
  return await connection("urls").where({ id: id }).increment("counter");
};

const getTopOneHundred = async () => {
  return await connection("urls")
    .select("title", "url", "counter")
    .orderBy("counter", "desc");
};

module.exports = {
  create,
  addCodeToUrl,
  getUrlById,
  addOneToCounter,
  getTopOneHundred,
};
