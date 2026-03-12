import React, { memo, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

function toIsoDay(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

function PlaceFormInner({ initialValue, onSubmit, submitLabel }) {
  const defaults = useMemo(
    () => ({
      name: '',
      description: '',
      category: '',
      isFavorite: false,
      day: '',
    }),
    []
  );

  const [name, setName] = useState(initialValue?.name ?? defaults.name);
  const [description, setDescription] = useState(initialValue?.description ?? defaults.description);
  const [category, setCategory] = useState(initialValue?.category ?? defaults.category);
  const [isFavorite, setIsFavorite] = useState(!!initialValue?.isFavorite);
  const [day, setDay] = useState(initialValue?.day ?? toIsoDay(initialValue?.visitedAt ?? initialValue?.createdAt ?? ''));

  const canSubmit = typeof name === 'string' && name.trim().length > 0;

  return (
    <View style={styles.root}>
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Eiffel Tower" style={styles.input} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category</Text>
        <TextInput value={category} onChangeText={setCategory} placeholder="Food / Park / Museum" style={styles.input} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Day (YYYY-MM-DD)</Text>
        <TextInput value={day} onChangeText={setDay} placeholder="2026-03-11" style={styles.input} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Notes"
          style={[styles.input, styles.multiline]}
          multiline
        />
      </View>

      <View style={[styles.field, styles.rowBetween]}>
        <Text style={styles.label}>Favorite</Text>
        <Switch value={isFavorite} onValueChange={setIsFavorite} />
      </View>

      <Pressable
        style={[styles.submit, !canSubmit && styles.submitDisabled]}
        disabled={!canSubmit}
        onPress={() =>
          onSubmit?.({
            name: name.trim(),
            description: description?.trim() ?? '',
            category: category?.trim() ?? '',
            isFavorite,
            day: typeof day === 'string' ? day.trim() : '',
          })
        }
      >
        <Text style={styles.submitText}>{submitLabel ?? 'Save'}</Text>
      </Pressable>
    </View>
  );
}

export const PlaceForm = memo(PlaceFormInner);

const styles = StyleSheet.create({
  root: {
    padding: 16,
    gap: 12,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submit: {
    marginTop: 6,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  submitDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});

