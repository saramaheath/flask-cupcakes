"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Cupcake(db.Model):
    __tablename__ = 'cupcakes'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )
    flavor = db.Column(
        db.String(50),
        nullable=False
    )
    size = db.Column(
        db.String(50),
        nullable=False
    )
    rating = db.Column(
        db.Integer,
        nullable=False
    )
    image = db.Column(
        db.Text,
        nullable=False,
        default='https://tinyurl.com/demo-cupcake'
    )

    def serialize(self):
        """return dictionary of instance"""

        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }

    @classmethod
    def fetch_all_cupcakes(cls):
        """gets all cupcakes"""

        return Cupcake.query.all()

    @classmethod
    def create_cupcakes(cls, flavor, size, rating, image):
        """creates a cupcake instance"""

        return Cupcake(
        flavor=flavor,
        size=size,
        rating=rating,
        image=image
    )


def connect_db(app):
    """Connect this database to provided Flask app. 
    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)