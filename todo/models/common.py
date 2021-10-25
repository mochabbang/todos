from django.db import models

# Create your models here.

class BaseModel(models.Model):
    """
    created_at, updated_at과 같은 자주 사용하는 필드를 정의합니다.
    """
    created_at = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=False,
        verbose_name="생성 일시",
        help_text="데이터가 생성된 날짜입니다"
    )
    updated_at = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=False,
        verbose_name="수정 일시",
        help_text="데이터가 수정된 날짜입니다"
    )

    class Meta:
        abstract = True