from django.db import models
from .common import BaseModel

class Todo(BaseModel):
    id = models.AutoField(primary_key=True)
    title = models.CharField(
        max_length=64,
        verbose_name="투두 제목",
        help_text="투두 제목 입니다."
    )
    description = models.CharField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name="투두 설명",
        help_text="투두 설명 입니다."
    )
    author = models.CharField(
        max_length=16,
        verbose_name="투두 작성자",
        help_text="투두 작성자를 나타냅니다."
    )
    due_date = models.DateTimeField(
        verbose_name="투두 마감일",
        help_text="투두 마감일을 나타냅니다."
    )
    completed = models.BooleanField(
        default=False,
        verbose_name="투두 완료 여부",
        help_text="투두 완료 여부를 나타냅니다."
    )

    class Meta:
        verbose_name='투두 리스트'
        verbose_name_plural='투두 리스트(들)'
        ordering = ['-created_at']

    def __str__(self):
        return f"Todo-{self.author}-{self.created_at}"