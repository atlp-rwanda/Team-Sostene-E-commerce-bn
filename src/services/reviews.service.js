import Reviews from '../database/models/reviews.model';
import User from '../database/models/user.model';
import UserProfile from '../database/models/userProfile.model';

async function getReviews(productId) {
  try {
    const reviews = await Reviews.findAll({
      where: { productId },
      include: [
        {
          model: User,
          include: [
            {
              model: UserProfile,
              attributes: ['names'],
            },
          ],
          attributes: ['id'],
        },
      ],
    });

    return reviews;
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    throw error;
  }
}

async function addReview(data) {
  const addedReview = await Reviews.create(data);
  return addedReview;
}

async function removeReviewAsUser(userId, reviewId) {
  const rmReview = await Reviews.destroy({ where: { id: reviewId, userId } });
  return rmReview;
}

async function getAverageRating(productId) {
  const allReviews = await Reviews.findAll({ where: { productId } });
  let totalRating = 0;
  for (let i = 0; i < allReviews.length; i += 1) {
    const rev = allReviews[i].rating;
    totalRating = parseInt(rev, 10) + totalRating;
  }
  const averageRating = totalRating / allReviews.length;
  return averageRating;
}

export default { getReviews, addReview, removeReviewAsUser, getAverageRating };
