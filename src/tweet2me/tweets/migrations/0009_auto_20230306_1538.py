# Generated by Django 3.2.18 on 2023-03-06 12:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0008_comment_tweet'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commentlike',
            name='comment',
        ),
        migrations.RemoveField(
            model_name='commentlike',
            name='user',
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='CommentLike',
        ),
    ]
