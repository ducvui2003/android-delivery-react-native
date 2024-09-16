package com.lamnguyen1305.deliveryreactnativeapp.fragment

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.AnimatorSet
import android.animation.ValueAnimator
import android.os.Bundle
import android.view.View
import android.view.ViewGroup.MarginLayoutParams
import android.view.animation.AccelerateDecelerateInterpolator
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.lamnguyen1305.deliveryreactnativeapp.R
import com.lamnguyen1305.deliveryreactnativeapp.utils.toDp

private const val ARG_PARAM1 = "index"

class CellFragment : Fragment(R.layout.fragment_cell) {
    private var index: Int = 0
    private lateinit var layout: LinearLayout
    private val heightCell = 35
    private var animatorAnimatorChangeNumber: ValueAnimator? = null
    private var number: Int = -1
    private lateinit var animatorAlphaStar: ValueAnimator
    private lateinit var animatorAlphaMinus: ValueAnimator
    private var animatorSet: AnimatorSet? = null
    private lateinit var tvStar: TextView
    private lateinit var tvMinus: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            index = it.getInt(ARG_PARAM1)
        }
        this.parentFragmentManager.apply {
            setFragmentResultListener(
                "cell_$index",
                this@CellFragment,
            ) { _: String, bundle: Bundle ->
                bundle.getInt("number", -1).takeIf { it != this@CellFragment.number }?.let {
                    startAnimatorChangeNumber(it)
                    this@CellFragment.number = it
                }
                runAnimatorAlpha(bundle.getBoolean("focus"))
            }

            setFragmentResultListener(
                "cell_${index}_focus",
                this@CellFragment,
            ) { _: String, bundle: Bundle ->
                runAnimatorAlpha(bundle.getBoolean("focus"))
            }
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        this.init(view)
        tvMinus.alpha = 0f
    }

    private fun init(view: View) {
        this.tvStar = view.findViewById(R.id.text_view_star)
        this.tvMinus = view.findViewById(R.id.text_view_minus)
        this.layout = view.findViewById(R.id.linear_layout_cell)
        this.animatorAlphaStar = ValueAnimator.ofFloat(1f, 0f).apply {
            duration = 1000
            addUpdateListener {
                tvStar.alpha = it.animatedValue as Float
            }
        }
        this.animatorAlphaMinus = ValueAnimator.ofFloat(0f, 1f).apply {
            duration = 1000
            addUpdateListener {
                tvMinus.alpha = it.animatedValue as Float
            }
        }
    }

    private fun focus() {
        startAnimatorChangeNumber(-1)
        this.animatorSet = AnimatorSet().apply {
            playTogether(animatorAlphaStar, animatorAlphaMinus) // Chạy tuần tự 2 animator
            addListener(object : AnimatorListenerAdapter() {
                override fun onAnimationEnd(animation: Animator) {
                    start() // Lặp lại liên tục khi kết thúc
                }
            })
            start()
        }
    }

    private fun blur() {
        this.animatorSet?.removeAllListeners()
        this.animatorSet?.cancel()
        this.tvMinus.alpha = 0f
        this.tvStar.alpha = 1f
    }

    private fun startAnimatorChangeNumber(number: Int) {
        this.blur()
        val lo = this.layout.layoutParams as MarginLayoutParams
        val value = number + 1
        this.animatorAnimatorChangeNumber?.removeAllUpdateListeners()
        this.animatorAnimatorChangeNumber = ValueAnimator.ofInt(lo.topMargin, -heightCell.toDp() * value).apply {
            duration = (100 * value).toLong()
            interpolator = AccelerateDecelerateInterpolator()
            addUpdateListener {
                lo.topMargin = it.animatedValue as Int
                layout.requestLayout()
            }
            start()
        }
    }

    private fun runAnimatorAlpha(focus: Boolean) {
        if (focus) focus()
        else blur()
    }

    companion object {
        @JvmStatic
        fun newInstance(index: Int) =
            CellFragment().apply {
                arguments = Bundle().apply {
                    putInt(ARG_PARAM1, index)
                }
            }

    }
}
