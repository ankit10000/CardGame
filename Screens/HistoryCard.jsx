import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export default function HistoryCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className="bg-white p-4 rounded-2xl shadow mb-3">
      <Text className="text-lg font-bold">{item.title}</Text>
      <Text className="text-gray-500">{item.date}</Text>
    </TouchableOpacity>
  );
}
