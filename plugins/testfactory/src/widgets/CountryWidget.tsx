import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import axios from "axios";
import { Widget } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";
import { JsonObject } from '@backstage/types';
// Define types for country and city options
interface Option {
  label: string;
  value: string;
}

interface CountryWidgetProps {
  value: string;
  onChange: (value: string) => void;
}

interface CityWidgetProps {
  value: string;
  onChange: (value: string) => void;
  formData: {
    country?: string;
  };
}

// Material-UI v4 Country Widget with Types
const CountryWidget: Widget<JsonObject, JSONSchema7, any> = ({ value, onChange }) => {
  const [countries, setCountries] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countryOptions: Option[] = response.data.map((country: any) => ({
        label: country.name.common,
        value: country.name.common,
      }));
      setCountries(countryOptions);
      setLoading(false);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {    
    onChange(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Select Country</InputLabel>
      <Select value={value || ""} onChange={handleChange} label="Select Country">        
        {!loading &&
          countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CountryWidget;