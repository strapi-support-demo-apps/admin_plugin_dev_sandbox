import { TextInput } from '@strapi/design-system';
import * as React from 'react';
import { useIntl } from 'react-intl';

export const CoordinatesField = React.forwardRef((props: any, ref: any) => {
  const { attribute, disabled, label, name, onChange, required, value } = props; // these are just some of the props passed by the content-manager

  const { formatMessage } = useIntl();

  const [lat, setLat] = React.useState(value.lat || '');
  const [lon, setLon] = React.useState(value.lon || '');

  const handleChange = (lat: string, lon: string) => {
    const coords = JSON.stringify({
      lat: lat,
      lon: lon,
    });
    console.log(coords);
    onChange({
      target: { name, type: attribute.type, value: coords },
    });
  };

  return (
    <div
      style={{
        gap: '4px',
        alignItems: 'stretch',
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      <label
        style={{
          fontSize: '1.2rem',
          lineHeight: '1.33',
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: '#ffffff',
          fontWeight: '600',
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          width: '49%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
          borderLeft: '2px solid #7b7aff',
          paddingTop: '10px',
          paddingLeft: '20px',
        }}
      >
        <div style={{ gap: '4px', display: 'flex', flexDirection: 'column' }}>
          <label
            style={{
              fontSize: '1.2rem',
              lineHeight: '1.33',
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#ffffff',
              fontWeight: '600',
            }}
          >
            latitude
          </label>
          <TextInput
            ref={ref}
            name={name}
            disabled={disabled}
            value={lat}
            required={required}
            onChange={(e: any) => {
              setLat(e.target.value);
              handleChange(e.target.value, lon);
            }}
          />
        </div>
        <div style={{ gap: '4px', display: 'flex', flexDirection: 'column' }}>
          <label
            style={{
              fontSize: '1.2rem',
              lineHeight: '1.33',
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#ffffff',
              fontWeight: '600',
            }}
          >
            longitude
          </label>
          <TextInput
            ref={ref}
            name={name}
            disabled={disabled}
            value={lon}
            required={required}
            onChange={(e: any) => {
              setLon(e.target.value);
              handleChange(lat, e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
});
