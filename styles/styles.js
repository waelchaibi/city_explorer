// styles.js
// Fichier unique qui contient TOUS les styles de l'appli.

import { StyleSheet } from 'react-native';

export const styles = {
  // ---------- LIST SCREEN ----------
  list: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    filtersContainer: {
      marginBottom: 12,
    },
    filterBlock: {
      marginBottom: 8,
    },
    filterLabel: {
      fontSize: 12,
      color: '#555',
      marginBottom: 4,
    },
    filterInput: {
      backgroundColor: '#fff',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 14,
    },
    listContent: {
      paddingBottom: 80,
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 32,
      color: '#777',
    },
    fab: {
      position: 'absolute',
      right: 24,
      bottom: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#2196F3',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    fabText: {
      color: '#fff',
      fontSize: 32,
      lineHeight: 32,
      fontWeight: 'bold',
    },
  }),

  // ---------- ADD PLACE SCREEN ----------
  addPlace: StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 12,
      marginBottom: 4,
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 14,
    },
    textArea: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    helper: {
      fontSize: 12,
      color: '#777',
      marginTop: 12,
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
      gap: 12,
    },
      root: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
   imagePicker: { 
    height: 200, 
    borderRadius: 12, 
    marginBottom: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    overflow: 'hidden'
  },
  imagePreview: { width: '100%', height: '100%' },
  placeholder: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  placeholderText: { fontSize: 16, color: '#666' },
  cameraButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center'
  },
  cameraText: { color: 'white', fontWeight: 'bold' },
  input: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    fontSize: 16 
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
  }),

  // ---------- PLACE DETAIL SCREEN ----------
  placeDetail: StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#fff',
    },
    image: {
      width: '100%',
      height: 240,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    date: {
      fontSize: 14,
      color: '#999',
      marginBottom: 8,
    },
    tags: {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      lineHeight: 22,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
  }),

  // ---------- PROFILE SCREEN ----------
profile: StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    gap: 8,
  },
  statItem: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  topCategoriesCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  categoryRank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginRight: 12,
    minWidth: 24,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 14,
    color: '#666',
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    textAlign: 'center',
    paddingVertical: 30,
    color: '#888',
    fontSize: 16,
    fontStyle: 'italic',
  },
}),




  // ---------- PLACE ITEM ----------
  placeItem: StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: 'white',
      borderRadius: 8,
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    image: {
      width: 64,
      height: 64,
      borderRadius: 8,
      marginRight: 12,
    },
    info: {
      flex: 1,
      justifyContent: 'center',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    tags: {
      fontSize: 12,
      color: '#666',
      marginBottom: 2,
    },
    date: {
      fontSize: 12,
      color: '#999',
    },
  }),

  // ---------- STATS CARD ----------
  statsCard: StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 8,
      borderLeftWidth: 4,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    iconContainer: {
      marginRight: 16,
    },
    icon: {
      fontSize: 28,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    value: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  }),
};
