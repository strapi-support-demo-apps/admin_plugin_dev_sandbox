import { TextInput, Button, Typography } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';

const GeneralSettings = async () => {
  return () => {
    const [value, setValue] = useState('');
    const fetchClient = useFetchClient();

    const loadSettings = async () => {
      const res = await fetchClient.get('/tweeter/admin/get_settings');
      setValue(res.data.settings ?? '');
      return res;
    };

    useEffect(() => {
      loadSettings();
    }, []);

    const handleOnChange = (e: any) => {
      setValue(e.target.value);
    };
    const handleOnSave = async () => {
      const res = await fetchClient.post('/tweeter/admin/save_settings', {
        value,
      });
      console.log(res);
    };
    return (
      <div style={{ padding: '50px' }}>
        <Typography>Supported Collection Types</Typography>
        <TextInput value={value} onChange={handleOnChange} placeholder="api1.api1,api2.api2" />
        <Button onClick={handleOnSave}>Save</Button>
      </div>
    );
  };
};

export default GeneralSettings;
