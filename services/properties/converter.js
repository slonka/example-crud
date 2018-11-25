function fromDb(property) {
  const converted = {
    owner: property.owner,
    address: {
      line1: property.line1,
      line4: property.line4,
      postCode: property.postCode,
      city: property.city,
      country: property.country,
    },
    airbnbId: property.airbnbId,
    numberOfBedrooms: property.numberOfBedrooms,
    numberOfBathrooms: property.numberOfBathrooms,
    incomeGenerated: property.incomeGenerated,
  };

  if (property.line2 !== undefined && property.line2 !== null) {
    converted.line2 = property.line2;
  }
  if (property.line3 !== undefined && property.line2 !== null) {
    converted.line3 = property.line3;
  }

  if (property.version_timestamp !== undefined && property.version_timestamp !== null) {
    converted.versionTimestamp = property.version_timestamp;
  }

  if (property.id !== null && property.id !== undefined) {
    converted.id = property.id;
  }

  if (property.version_type === 1) {
    converted.versionType = 'CREATED';
  } else if (property.version_type === 2) {
    converted.versionType = 'UPDATED';
  } else if (property.version_type === 3) {
    converted.versionType = 'DELETED';
  }

  return converted;
}

function toDb(property) {
  const converted = { ...property, ...property.address };
  delete converted.address;
  return converted;
}

module.exports = {
  fromDb,
  toDb,
};
