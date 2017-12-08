module.exports = {
  mongo_connection: process.env.MONGO_URL || 'mongodb://admin:httpsonly@ds019471.mlab.com:19471/cs498-final-project',
  port: process.env.PORT || 3000,
  passport_db: "mongodb://admin:httpsonly@ds129946.mlab.com:29946/passport"
};
