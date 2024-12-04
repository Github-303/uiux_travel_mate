import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressCircle } from 'react-native-svg-charts';
import NavigationMenu from '../components/NavigationMenu';
const reviews = [
    { key: '1', name: 'Ayoub ELHOURCH', rating: 4, comment: 'Nice hotel and Great food and have nice things to visit around', time: '20 mins ago', avatar: require('../assets/Ellipse2.png') },
    { key: '2', name: 'Dzigbodi Hosi', rating: 5, comment: "Can't hate this place. Love the place", time: '2 days ago', avatar: require('../assets/Ellipse2.1.png') },
    { key: '3', name: 'Hanna', rating: 4.5, comment: 'Good service', time: '2 days ago', avatar: require('../assets/Ellipse2.2.png') },
    { key: '4', name: 'Kate', rating: 4.5, comment: "Golf is one of the classic hotels in Cote d'Ivoire. Great service, wonderful pool area situated next to the lagoon. They have also recently renovated most of the amenities. Lovely hotel", time: '3 days ago', avatar: require('../assets/Ellipse2.3.png') },
];

const Screen2 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = reviews.filter(review => 
        review.name.toLowerCase().includes(query.toLowerCase()) || 
        review.comment.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredReviews(filtered);
    } else {
      setFilteredReviews(reviews);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredReviews(reviews);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="angle-left" size={40} color="black" /> 
        <Text style={styles.title}>Rating & Reviews</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#0090FF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search reviews"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={clearSearch} style={styles.xmarkIcon}>
            <Icon name="times" size={20} color="#0090FF" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Review Summary Header */}
      <View style={styles.reviewSummaryContainer}>
        <Text style={styles.reviewSummaryText}>Review Summary</Text>
        <TouchableOpacity onPress={() => alert('Write a Review')}>
          <Text style={styles.writeReviewText}>+ WRITE A REVIEW</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Circles with Labels */}
      <View style={styles.circleChartsContainer}>
        {/* 5 Stars */}
        <View style={styles.circleChartWrapper}>
          <ProgressCircle
            style={styles.circleChart}
            progress={1}
            progressColor={'#0090FF'}
            backgroundColor="#e0e0e0"
            strokeWidth={8}
          />
          <View style={styles.circleContent}>
            <View style={styles.starContainer}>
              <Text style={styles.circleText}>5</Text>
              <Icon name="star" size={12} color="#FFD700" />
            </View>
            <Text style={styles.percentageText}>30%</Text>
          </View>
        </View>

        {/* 4 Stars */}
        <View style={styles.circleChartWrapper}>
          <ProgressCircle
            style={styles.circleChart}
            progress={0.75}
            progressColor={'#00BD6B'}
            backgroundColor="#e0e0e0"
            strokeWidth={8}
          />
          <View style={styles.circleContent}>
            <View style={styles.starContainer}>
              <Text style={styles.circleText}>4</Text>
              <Icon name="star" size={12} color="#FFD700" />
            </View>
            <Text style={styles.percentageText}>40%</Text>
          </View>
        </View>

        {/* 3 Stars */}
        <View style={styles.circleChartWrapper}>
          <ProgressCircle
            style={styles.circleChart}
            progress={0.5}
            progressColor={'#D1EB31'}
            backgroundColor="#e0e0e0"
            strokeWidth={8}
          />
          <View style={styles.circleContent}>
            <View style={styles.starContainer}>
              <Text style={styles.circleText}>3</Text>
              <Icon name="star" size={12} color="#FFD700" />
            </View>
            <Text style={styles.percentageText}>20%</Text>
          </View>

        </View>

        {/* 2 Stars */}
        <View style={styles.circleChartWrapper}>
          <ProgressCircle
            style={styles.circleChart}
            progress={0.4}
            progressColor={'#EBA731'}
            backgroundColor="#e0e0e0"
            strokeWidth={8}
          />
          <View style={styles.circleContent}>
            <View style={styles.starContainer}>
              <Text style={styles.circleText}>2</Text>
              <Icon name="star" size={12} color="#FFD700" />
            </View>
            <Text style={styles.percentageText}>15%</Text>
          </View>
        </View>

        {/* 1 Star */}
        <View style={styles.circleChartWrapper}>
          <ProgressCircle
            style={styles.circleChart}
            progress={0.2}
            progressColor={'#E4390F'}
            backgroundColor="#e0e0e0"
            strokeWidth={8}
          />
          <View style={styles.circleContent}>
            <View style={styles.starContainer}>
              <Text style={styles.circleText}>1</Text>
              <Icon name="star" size={12} color="#FFD700" />
            </View>
            <Text style={styles.percentageText}>5%</Text>
          </View>
        </View>
      </View>

      {/* Specific Ratings */}
      <View style={styles.specificRatingsContainer}>
        <View style={styles.specificRating}>
          <Text>Rooms</Text>
          <Text>4.5</Text>
        </View>
        <Text style={styles.separator}>|</Text>
        <View style={styles.specificRating}>
          <Text>Location</Text>
          <Text>4.8</Text>
        </View>
        <Text style={styles.separator}>|</Text>
        <View style={styles.specificRating}>
          <Text>Service</Text>
          <Text>4.4</Text>
        </View>
      </View>

      {/* Overall Summary */}
      {/* Overall Summary */}
      <View style={styles.overallSummaryContainer}>
        <Text style={styles.overallRating}>4.4</Text> 
        <View style={styles.overallDetails}>
          <Text style={styles.overallText}>Very Good</Text>
          <View style={styles.starContainer}>
            <Icon name="star" size={20} color="#FFD700" />
            <Icon name="star" size={20} color="#FFD700" />
            <Icon name="star" size={20} color="#FFD700" />
            <Icon name="star" size={20} color="#FFD700" />
            <Icon name="star-half" size={20} color="#FFD700" />
          </View>
        </View>
      </View>

    
      <View style={styles.separator1} />
      {/* Reviews List */}
      <FlatList
  data={reviews}
  renderItem={({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.headerContainer}>
      <View style={styles.imageContainer}>
          <Image 
            source={item.avatar} // Sử dụng avatar từ dữ liệu
            style={styles.image} 
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameRatingContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.rating}>{item.rating}/5</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  )}
  keyExtractor={(item) => item.key}
/>

      {/* Thêm NavigationMenu vào cuối màn hình */}
      <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  reviewSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewSummaryText: {
    fontSize: 15,
  },
  writeReviewText: {
    fontSize: 15,
    color: '#0090FF',
  },
  circleChartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  circleChartWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleChart: {
    width: 60,
    height: 60,
  },
  circleContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Aligns the star icon with the top of the text
    
  },
  circleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 2,
  },
  percentageText: {
    fontSize: 14,
    color: '#555',
  },
  specificRatingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  specificRating: {
    alignItems: 'center',
  },
  separator: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  separator1: {
  height: 1, // Chiều cao của đường line
  backgroundColor: '#D3D3D3', // Màu sắc đường line (màu xám)
  marginVertical: 10, // Khoảng cách phía trên và dưới đường line
},

  overallSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginBottom: 0,
    marginLeft: 20
  },
  overallDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 10
  },
  overallRating: {
    fontSize: 44,
    fontWeight: '500',
  },
  overallText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
    fontWeight: '500'
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa các thành phần theo chiều dọc
  },
  imageContainer: {
    width: 50, // Đặt kích thước cho khung
    height: 50,
    borderRadius: 25, // Để tạo khung tròn
    overflow: 'hidden', // Ẩn các phần thừa ra ngoài
    marginRight: 10, // Khoảng cách giữa ảnh và tên
  },
  image: {
    width: '100%', // Đảm bảo ảnh chiếm toàn bộ khung
    height: '100%',
    resizeMode: 'cover', // Giữ tỉ lệ ảnh
  },
  textContainer: {
    flex: 1, // Cho phép phần văn bản chiếm hết không gian còn lại
    marginBottom: 10
  },
  nameRatingContainer: {
    flexDirection: 'row', // Đặt tên và đánh giá nằm ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  name: {
    fontWeight: '500',
    marginRight: 10, // Khoảng cách giữa tên và đánh giá
    
  },
  time: {
    // Các thuộc tính kiểu cho thời gian
  },
  rating: {
    marginLeft: 'auto', // Khoảng cách giữa tên và đánh giá
  },
  comment: {
    // Các thuộc tính kiểu cho bình luận
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  xmarkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen2;
