
from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, UserProfile, Activity, Workout, Leaderboard
from datetime import date

"""
Populate the octofit_db database with test data
"""

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear all collections
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        UserProfile.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users (superheroes)
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': marvel},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': marvel},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': dc},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': dc},
        ]
        user_objs = []
        for u in users:
            user_objs.append(UserProfile.objects.create(**u))

        # Create activities
        Activity.objects.create(user=user_objs[0], type='Running', duration=30, date=date.today())
        Activity.objects.create(user=user_objs[1], type='Cycling', duration=45, date=date.today())
        Activity.objects.create(user=user_objs[2], type='Swimming', duration=60, date=date.today())
        Activity.objects.create(user=user_objs[3], type='Yoga', duration=40, date=date.today())

        # Create workouts
        w1 = Workout.objects.create(name='Hero HIIT', description='High intensity interval training for heroes')
        w2 = Workout.objects.create(name='Power Yoga', description='Yoga for strength and flexibility')
        w1.suggested_for.set([marvel, dc])
        w2.suggested_for.set([dc])

        # Create leaderboard
        Leaderboard.objects.create(user=user_objs[0], score=100)
        Leaderboard.objects.create(user=user_objs[1], score=90)
        Leaderboard.objects.create(user=user_objs[2], score=95)
        Leaderboard.objects.create(user=user_objs[3], score=85)

        self.stdout.write(self.style.SUCCESS('Populate the octofit_db database with test data completed.'))
