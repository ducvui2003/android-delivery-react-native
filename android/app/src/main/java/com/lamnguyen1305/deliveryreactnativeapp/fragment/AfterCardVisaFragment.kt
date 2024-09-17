package com.lamnguyen1305.deliveryreactnativeapp.fragment

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.lamnguyen1305.deliveryreactnativeapp.R


class AfterCardVisaFragment : Fragment(R.layout.fragment_after_card_visa) {
    private var cvv: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        CardVisaFragment.Companion.FieldCard.CVV.getData {
            receiveCvv(it)
        }

        CardVisaFragment.Companion.FieldCard.CVV.getFocus {
            childFragmentManager.setFragmentResult("cell_${cvv.length + 100}_focus", Bundle().apply {
                putBoolean("focus", it)
            })
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        this.init()
    }

    private fun init() {
        this.childFragmentManager.beginTransaction().apply {
            replace(R.id.cell_1, CellFragment.newInstanceHasColor(100, "#000000"))
            replace(R.id.cell_2, CellFragment.newInstanceHasColor(101, "#000000"))
            replace(R.id.cell_3, CellFragment.newInstanceHasColor(102, "#000000"))
        }.commitNow()
    }

    private fun receiveCvv(text: String) {
        this.cvv = text
        text.split("").filter { it.isNotBlank() }.forEachIndexed { index, s ->
            sendCardNumber(index, s.toInt())
        }
        (text.length < 3).run {
            childFragmentManager.setFragmentResult("cell_${text.length + 100}", Bundle().apply {
                putBoolean("focus", true)
            })
        }
        for (index in text.length + 1 until 3) {
            sendCardNumber(index, -1)
        }
    }

    private fun sendCardNumber(cellNumber: Int, number: Int) {
        this.childFragmentManager.setFragmentResult("cell_${cellNumber + 100}", Bundle().apply {
            putInt("number", number)
        })
    }

    private fun CardVisaFragment.Companion.FieldCard.getData(callBack: (data: String) -> Unit) {
        this@AfterCardVisaFragment.parentFragmentManager.apply {
            setFragmentResultListener(
                getName(),
                this@AfterCardVisaFragment
            ) { _: String, bundle: Bundle ->
                bundle.getString("data")
                    ?.let { callBack(it) }
            }
        }
    }

    private fun CardVisaFragment.Companion.FieldCard.getFocus(callBack: (focus: Boolean) -> Unit) {
        this@AfterCardVisaFragment.parentFragmentManager.apply {
            setFragmentResultListener(
               "${getName()}_focus",
                this@AfterCardVisaFragment
            ) { _: String, bundle: Bundle ->
                callBack(bundle.getBoolean("focus"))
            }
        }
    }
}
