const exportProfileId = (filename) => {
  const idAndExtension = filename.split("-")
  const id = idAndExtension[1].split(".")
  return id[0]
}

module.exports = { exportProfileId }
