import { Box } from '@strapi/design-system';
import { MultiSelect } from '@strapi/design-system';
import { MultiSelectOption } from '@strapi/design-system';
import { ComboboxOption } from '@strapi/design-system';
import { Combobox } from '@strapi/design-system';
import { MultiSelectNested } from '@strapi/design-system';
import { TextInput, Button, Typography } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';
import { Check } from '@strapi/icons';

const GeneralSettings = async () => {
  return () => {
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
    const [collectionFields, setCollectionFields] = useState<Record<string, string[]>>({});
    const [allCollections, setAllCollections] = useState<Record<string, string[]>>({});
    const [initialSettings, setInitialSettings] = useState<Record<string, string[]>>({});

    const { get, post } = useFetchClient();

    useEffect(() => {
      const loadSettings = async () => {
        const collectionTypesData = await get('/tweeter/admin/get_types');
        const settingsData = await get('/tweeter/admin/get_settings');

        const rawCollections = collectionTypesData.data;
        const parsedCollections: Record<string, string[]> = {};
        for (const [uid, schema] of Object.entries<any>(rawCollections)) {
          const attributes = schema.contentType?.attributes || {};
          const visibleFields = Object.entries(attributes)
            .filter(([_, attr]: any) => attr.visible !== false && attr.private !== true)
            .map(([key]) => key);

          parsedCollections[uid.replace('api::', '')] = visibleFields;
        }
        setAllCollections(parsedCollections);

        const saved = settingsData.data.settings || [];
        setInitialSettings(saved);
        setSelectedCollections(Object.keys(saved));
        setCollectionFields(saved);
      };
      loadSettings();
    }, []);

    const handleSave = async () => {
      console.log(collectionFields);
      await post('/tweeter/admin/save_settings', {
        value: collectionFields,
      });
    };

    const handleCollectionChange = (newValues: string[]) => {
      setSelectedCollections(newValues);
      const updatedFields = { ...collectionFields };

      newValues.forEach((col) => {
        if (!updatedFields[col]) {
          updatedFields[col] = [];
        }
      });

      // Remove any deselected collections
      Object.keys(updatedFields).forEach((col) => {
        if (!newValues.includes(col)) {
          delete updatedFields[col];
        }
      });

      setCollectionFields(updatedFields);
    };

    const handleFieldChange = (collection: string, fields: string[]) => {
      setCollectionFields((prev) => ({
        ...prev,
        [collection]: fields,
      }));
    };

    const hasChanges = () => {
      const initialKeys = Object.keys(initialSettings).sort();
      const currentKeys = Object.keys(collectionFields).sort();

      if (
        initialKeys.length !== currentKeys.length ||
        !initialKeys.every((key, i) => key === currentKeys[i])
      ) {
        return true;
      }

      for (const key of currentKeys) {
        const initialFields = [...(initialSettings[key] || [])].sort();
        const currentFields = [...(collectionFields[key] || [])].sort();
        if (
          initialFields.length !== currentFields.length ||
          !initialFields.every((f, i) => f === currentFields[i])
        ) {
          return true;
        }
      }

      return false;
    };

    return (
      <Box>
        <div
          style={{
            paddingTop: '40px',
            paddingBottom: '40px',
            paddingLeft: '56px',
            paddingRight: '56px',
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            style={{
              fontWeight: '600',
              fontSize: '3.2rem',
              lineHeight: '1.25',
            }}
            variant="beta"
          >
            Collection Type Settings
          </Typography>
          <Button disabled={!hasChanges()} startIcon={<Check />} onClick={handleSave}>
            Save
          </Button>
        </div>
        <div style={{ paddingLeft: '56px', paddingRight: '56px' }}>
          <Box
            style={{
              backgroundColor: '#202133',
              width: '100%',
              paddingTop: '24px',
              paddingBottom: '24px',
              paddingLeft: '32px',
              paddingRight: '32px',
              gap: '16px',
              alignItems: 'stretch',
              flexDirection: 'column',
              display: 'flex',
            }}
          >
            <Box
              style={{
                gap: '4px',
                alignItems: 'stretch',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              <h2 style={{ fontWeight: '500', fontSize: '1.6rem', lineHeight: '1.25' }}>
                Settings
              </h2>
              <span style={{ fontSize: '1.4rem', lineHeight: '1.43' }}>
                Choose what collections you want to tweet from:
              </span>
            </Box>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Box
                style={{
                  gap: '4px',
                  alignItems: 'stretch',
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                <Typography
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
                  variant="beta"
                >
                  Collection Types
                </Typography>
                <MultiSelect
                  size="medium"
                  label="Collections"
                  placeholder="Select collections"
                  value={selectedCollections}
                  onChange={handleCollectionChange}
                  required
                  onClear={() => {
                    setSelectedCollections([]);
                    setCollectionFields({});
                  }}
                >
                  {Object.keys(allCollections).map((col) => (
                    <MultiSelectOption key={col} value={col}>
                      {col.split('.')[0].charAt(0).charAt(0).toUpperCase() +
                        col.split('.')[0].slice(1)}
                    </MultiSelectOption>
                  ))}
                </MultiSelect>
              </Box>

              {selectedCollections.map((col) => (
                <Box
                  style={{
                    gap: '4px',
                    alignItems: 'stretch',
                    flexDirection: 'column',
                    display: 'flex',
                  }}
                  key={col}
                >
                  <Typography
                    style={{
                      fontSize: '1.2rem',
                      lineHeight: '1.33',
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textVverflow: 'ellipsis',
                      color: '#ffffff',
                      fontWeight: '600',
                    }}
                    variant="beta"
                  >
                    Fields for the{' '}
                    <span style={{ fontWeight: '600', color: '#4844ff' }}>
                      {col.split('.')[0].charAt(0).toUpperCase() + col.split('.')[0].slice(1)}
                    </span>{' '}
                    collection
                  </Typography>
                  <MultiSelect
                    label={`Fields for ${col}`}
                    placeholder="Select fields"
                    value={collectionFields[col] || []}
                    onChange={(values: any) => handleFieldChange(col, values)}
                    multiple
                  >
                    {(allCollections[col] || []).map((field: any) => (
                      <MultiSelectOption key={field} value={field}>
                        {field}
                      </MultiSelectOption>
                    ))}
                  </MultiSelect>
                </Box>
              ))}
            </div>
          </Box>
        </div>
      </Box>
    );
  };
};

export default GeneralSettings;
