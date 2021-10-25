# Generated by Django 3.2.8 on 2021-10-25 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='데이터가 생성된 날짜입니다', verbose_name='생성 일시')),
                ('updated_at', models.DateTimeField(auto_now_add=True, help_text='데이터가 수정된 날짜입니다', verbose_name='수정 일시')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(help_text='투두 제목 입니다.', max_length=64, verbose_name='투두 제목')),
                ('description', models.CharField(blank=True, help_text='투두 설명 입니다.', max_length=256, null=True, verbose_name='투두 설명')),
                ('author', models.CharField(help_text='투두 작성자를 나타냅니다.', max_length=16, verbose_name='투두 작성자')),
                ('due_date', models.DateTimeField(help_text='투두 마감일을 나타냅니다.', verbose_name='투두 마감일')),
                ('completed', models.BooleanField(default=False, help_text='투두 완료 여부를 나타냅니다.', verbose_name='투두 완료 여부')),
            ],
            options={
                'verbose_name': '투두 리스트',
                'verbose_name_plural': '투두 리스트(들)',
                'ordering': ['-created_at'],
            },
        ),
    ]
