import React, { useEffect, useState } from "react";
import { TextField, MenuItem, CircularProgress } from "@material-ui/core";
import { WidgetProps } from '@rjsf/utils';

// Define the type for the country response
interface Country {
  languages?: {
    [key: string]: string;
  };
}

const LanguageSelectWidget: React.FC<WidgetProps> = (props) => {
  const { id, label, required, onChange, value } = props;
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data: Country[]) => {
        const languageSet = new Set<string>();

        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((language) => {
              languageSet.add(language);
            });
          }
        });

        const uniqueLanguages = Array.from(languageSet).sort();
        setLanguages(uniqueLanguages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
        setLoading(false);
      });
  }, []);

  return (
    <TextField
      id={id}
      label={label}
      required={required}
      select
      fullWidth
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      variant="outlined"
      disabled={loading}
      InputProps={{
        endAdornment: loading ? <CircularProgress size={24} /> : null,
      }}
    >
      {languages.map((lang, index) => (
        <MenuItem key={index} value={lang}>
          {lang}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default LanguageSelectWidget;
