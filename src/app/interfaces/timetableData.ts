interface TimetableData {
    [group: string]: {
      [subgroup: string]: {
        Monday: {
          Numerator: string[];
          Denumerator: string[];
        };
        Saturday: {
          Numerator: string[];
          Denumerator: string[];
        };
      };
    };
  }