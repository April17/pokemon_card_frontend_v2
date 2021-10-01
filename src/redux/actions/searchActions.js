export const actions = {
    nameAction: (nameData) => ({ type: "NAME_DATA", payload: nameData }),
    typesAction: (typesData) => ({ type: "TYPES_DATA", payload: typesData }),
    subtypeAction: (subtypeData) => ({ type: "SUBTYPE_DATA", payload: subtypeData }),
    supertypeAction: (supertypeData) => ({ type: "SUPERTYPE_DATA", payload: supertypeData }),
    rarityAction: (rarityData) => ({ type: "RARITY_DATA", payload: rarityData }),
    resultAction: (resultData) => ({ type: "RESULT_DATA", payload: resultData }),
  };